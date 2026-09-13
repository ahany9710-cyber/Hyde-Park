<?php
/**
 * Plugin Name: One Hyde Park Landing
 * Description: ينشئ صفحة لاندنج One Hyde Park على نفس الدومين بـ slug مختلف، من غير هيدر أو فوتر الثيم.
 * Version: 1.0.0
 * Author: Flair Agency
 * Text Domain: ohp-landing
 */

if (!defined('ABSPATH')) {
    exit;
}

const OHP_LANDING_SLUG = 'one-hyde-park';
const OHP_LANDING_OPTION = 'ohp_landing_page_id';
const OHP_TOWNSIDE_SLUG = 'el-patio-townside';
const OHP_TOWNSIDE_OPTION = 'ohp_townside_page_id';
const OHP_REWRITE_VERSION = '2';

register_activation_hook(__FILE__, 'ohp_landing_activate');
register_deactivation_hook(__FILE__, 'ohp_landing_deactivate');

add_action('init', 'ohp_landing_register_rewrites');
add_filter('query_vars', 'ohp_landing_query_vars');
add_action('template_redirect', 'ohp_landing_render', 0);
add_filter('redirect_canonical', 'ohp_landing_disable_canonical', 10, 2);
add_action('admin_notices', 'ohp_landing_admin_notice');

function ohp_landing_activate() {
    ohp_landing_ensure_page();
    ohp_landing_ensure_townside_page();
    ohp_landing_register_rewrites();
    flush_rewrite_rules();
    update_option('ohp_landing_rewrite_ver', OHP_REWRITE_VERSION);
    set_transient('ohp_landing_activated', '1', DAY_IN_SECONDS);
}

function ohp_landing_deactivate() {
    flush_rewrite_rules();
}

function ohp_landing_ensure_page() {
    $existing_id = (int) get_option(OHP_LANDING_OPTION);
    if ($existing_id && get_post_status($existing_id) === 'publish') {
        return $existing_id;
    }

    $by_slug = get_page_by_path(OHP_LANDING_SLUG);
    if ($by_slug instanceof WP_Post) {
        update_option(OHP_LANDING_OPTION, $by_slug->ID);
        return (int) $by_slug->ID;
    }

    $page_id = wp_insert_post(array(
        'post_title'   => 'One Hyde Park',
        'post_name'    => OHP_LANDING_SLUG,
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '',
        'post_author'  => get_current_user_id() ?: 1,
    ), true);

    if (is_wp_error($page_id)) {
        return 0;
    }

    update_option(OHP_LANDING_OPTION, (int) $page_id);
    return (int) $page_id;
}

function ohp_landing_ensure_townside_page() {
    $existing_id = (int) get_option(OHP_TOWNSIDE_OPTION);
    if ($existing_id && get_post_status($existing_id) === 'publish') {
        return $existing_id;
    }

    $by_slug = get_page_by_path(OHP_TOWNSIDE_SLUG);
    if ($by_slug instanceof WP_Post) {
        update_option(OHP_TOWNSIDE_OPTION, $by_slug->ID);
        return (int) $by_slug->ID;
    }

    $page_id = wp_insert_post(array(
        'post_title'   => 'El Patio Townside',
        'post_name'    => OHP_TOWNSIDE_SLUG,
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_content' => '',
        'post_author'  => get_current_user_id() ?: 1,
    ), true);

    if (is_wp_error($page_id)) {
        return 0;
    }

    update_option(OHP_TOWNSIDE_OPTION, (int) $page_id);
    return (int) $page_id;
}

function ohp_landing_register_rewrites() {
    foreach (array(OHP_LANDING_SLUG, OHP_TOWNSIDE_SLUG) as $slug) {
        add_rewrite_rule(
            '^' . $slug . '/?$',
            'index.php?pagename=' . $slug,
            'top'
        );
        add_rewrite_rule(
            '^' . $slug . '/(.+)/?$',
            'index.php?pagename=' . $slug . '&ohp_path=$matches[1]',
            'top'
        );
    }

    if (get_option('ohp_landing_rewrite_ver') !== OHP_REWRITE_VERSION) {
        update_option('ohp_landing_rewrite_ver', OHP_REWRITE_VERSION);
        ohp_landing_ensure_townside_page();
        flush_rewrite_rules(false);
    }
}

function ohp_landing_query_vars($vars) {
    $vars[] = 'ohp_path';
    return $vars;
}

function ohp_landing_request_path() {
    $uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    $path = wp_parse_url($uri, PHP_URL_PATH);
    if (!is_string($path) || $path === '') {
        return '/';
    }

    $home_path = wp_parse_url(home_url('/'), PHP_URL_PATH);
    if (is_string($home_path) && $home_path !== '/' && strpos($path, $home_path) === 0) {
        $path = substr($path, strlen(rtrim($home_path, '/')));
    }

    return '/' . ltrim($path, '/');
}

function ohp_landing_matches_slug($path, $slug) {
    return $path === '/' . $slug || $path === '/' . $slug . '/' || strpos($path, '/' . $slug . '/') === 0;
}

function ohp_landing_active_slug() {
    $path = ohp_landing_request_path();
    if (ohp_landing_matches_slug($path, OHP_TOWNSIDE_SLUG)) {
        return OHP_TOWNSIDE_SLUG;
    }
    return OHP_LANDING_SLUG;
}

function ohp_landing_is_request() {
    $path = ohp_landing_request_path();
    return ohp_landing_matches_slug($path, OHP_LANDING_SLUG) || ohp_landing_matches_slug($path, OHP_TOWNSIDE_SLUG);
}

function ohp_landing_disable_canonical($redirect_url, $requested_url) {
    if (ohp_landing_is_request()) {
        return false;
    }
    return $redirect_url;
}

function ohp_landing_asset_base() {
    return trailingslashit(plugins_url('dist', __FILE__));
}

function ohp_landing_basename($slug = OHP_LANDING_SLUG) {
    $path = wp_parse_url(home_url('/' . $slug), PHP_URL_PATH);
    if (!is_string($path) || $path === '') {
        return '/' . $slug;
    }
    return untrailingslashit($path);
}

function ohp_landing_render() {
    if (!ohp_landing_is_request()) {
        return;
    }

    $index = plugin_dir_path(__FILE__) . 'dist/index.html';
    if (!is_readable($index)) {
        status_header(500);
        echo 'One Hyde Park landing assets are missing.';
        exit;
    }

    $html = file_get_contents($index);
    if ($html === false) {
        status_header(500);
        echo 'One Hyde Park landing could not be loaded.';
        exit;
    }

    $slug = ohp_landing_active_slug();
    $home = $slug === OHP_TOWNSIDE_SLUG ? 'townside' : 'hyde';
    $inject = '<base href="' . esc_url(ohp_landing_asset_base()) . '">'
        . '<script>window.__OHP_BASENAME__=' . wp_json_encode(ohp_landing_basename($slug))
        . ';window.__OHP_HOME__=' . wp_json_encode($home) . ';</script>';

    if ($home === 'townside') {
        $html = preg_replace(
            '/<title>.*?<\/title>/i',
            '<title>El Patio Townside | تسويق Flair Agency</title>',
            $html,
            1
        );
    }

    if (stripos($html, '<head>') !== false) {
        $html = preg_replace('/<head>/i', '<head>' . $inject, $html, 1);
    } else {
        $html = $inject . $html;
    }

    status_header(200);
    nocache_headers();
    header('Content-Type: text/html; charset=UTF-8');
    echo $html;
    exit;
}

function ohp_landing_admin_notice() {
    if (!current_user_can('manage_options') || !get_transient('ohp_landing_activated')) {
        return;
    }

    $url = home_url('/' . OHP_LANDING_SLUG . '/');
    echo '<div class="notice notice-success is-dismissible"><p>';
    echo 'لاندنج One Hyde Park اتعملت على نفس الموقع بـ slug مختلف: ';
    echo '<a href="' . esc_url($url) . '" target="_blank" rel="noopener noreferrer">' . esc_html($url) . '</a>';
    echo '</p></div>';
}
