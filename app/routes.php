<?php

/**
 * @package Joostina
 * @copyright Авторские права (C) 2008-2010 Joostina team. Все права защищены.
 * @license Лицензия http://www.gnu.org/licenses/gpl-2.0.htm GNU/GPL, или help/license.php
 * Joostina! - свободное программное обеспечение распространяемое по условиям лицензии GNU/GPL
 * Для получения информации о используемых расширениях и замечаний об авторском праве, смотрите файл help/copyright.php.
 */
// запрет прямого доступа
defined('_JOOS_CORE') or die();

return array(
	//'default' => array('href' => '', 'action' => 'mainpage', 'task' => 'index'),
	//'content' => array('href' => 'content', 'action' => 'content', 'task' => 'index'),
	'default' => array(
		'href' => '',
		'defaults' => array('controller' => 'mainpage', 'action' => 'index')
	),
	'login' => array(
		'href' => 'login',
		'defaults' => array('controller' => 'users', 'action' => 'login')
	),
	'logout' => array(
		'href' => 'logout',
		'defaults' => array('controller' => 'users', 'action' => 'logout')
	),
	'lostpassword' => array(
		'href' => 'lostpassword',
		'defaults' => array('controller' => 'users', 'action' => 'lostpassword')
	),
	'register' => array(
		'href' => 'register',
		'defaults' => array('controller' => 'users', 'action' => 'register')
	),
	'user_view' => array(
		'href' => 'user/view-<id>/<username>',
		'params_rules' => array('id' => '\d+', 'username' => '\w+'),
		'defaults' => array('controller' => 'users', 'action' => 'view')
	),
	'contacts' => array(
		'href' => 'feedback',
		'defaults' => array('controller' => 'contacts', 'action' => 'index')
	),
	'test' => array(
		'href' => 'test',
		'defaults' => array('controller' => 'test', 'action' => 'index')
	),
	// сборник тестиования системных функций
	'unittest' => array(
		'href' => 'unittest',
		'defaults' => array('controller' => 'example', 'action' => 'index')
	),
	/* Компонент новостей */
	'news' => array(
		'href' => 'news',
		'defaults' => array('controller' => 'news', 'action' => 'index')
	),
	'news_view' => array(
		'href' => 'news/view/<id>',
		'params_rules' => array('id' => '\d+'),
		'defaults' => array('controller' => 'news', 'action' => 'view')
	),
	'news_pages' => array(
		'href' => 'news/page/<page>',
		'params_rules' => array('page' => '\d+'),
		'defaults' => array('controller' => 'news', 'action' => 'index')
	),
	'news_archive' => array(
		'href' => 'news',
		'defaults' => array('controller' => 'news', 'action' => 'archive')
	),
	/* Компонент блогов */
	'blog' => array(
		'href' => 'blogs',
		'defaults' => array('controller' => 'blog', 'action' => 'index')
	),
	'blog_view' => array(
		'href' => 'blogs/<cat_slug>/<id>',
		'params_rules' => array('id' => '\d+', 'cat_slug' => '[a-z]+'),
		'defaults' => array('controller' => 'blog', 'action' => 'view')
	),
	'blog_edit' => array(
		'href' => 'blogs/edit/<id>',
		'params_rules' => array('id' => '\d+'),
		'defaults' => array('controller' => 'blog', 'action' => 'view')
	),
	'blog_cat' => array(
		'href' => 'blogs/<cat_slug>',
		'params_rules' => array('cat_slug' => '[a-z]+'),
		'defaults' => array('controller' => 'blog', 'action' => 'category')
	),
	'blog_pages' => array(
		'href' => 'blogs/page/<page>',
		'params_rules' => array('page' => '\d+'),
		'defaults' => array('controller' => 'blog', 'action' => 'index')
	),
	/* Компонент страниц */
	'pages' => array(
		'href' => 'pages',
		'defaults' => array('controller' => 'pages', 'action' => 'index')
	),
	'pages_view' => array(
		'href' => '<page_name>',
		'params_rules' => array('page_name' => '[a-z0-9\_\-\.]+'),
		'defaults' => array('controller' => 'pages', 'action' => 'view')
	),
);
