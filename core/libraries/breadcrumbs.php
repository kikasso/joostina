<?php

/**
 * @package Joostina
 * @copyright Авторские права (C) 2007-2010 Joostina team. Все права защищены.
 * @license Лицензия http://www.gnu.org/licenses/gpl-2.0.htm GNU/GPL, или help/license.php
 * Joostina! - свободное программное обеспечение распространяемое по условиям лицензии GNU/GPL
 * Для получения информации о используемых расширениях и замечаний об авторском праве, смотрите файл help/copyright.php.
 */
// запрет прямого доступа
defined('_JOOS_CORE') or die();


// "хлебные крошки"
class joosBreadcrumbs {

	private static $instance;
	private static $breadcrumbs = array();

	/**
	 *
	 * @return joosBreadcrumbs
	 */
	public static function instance() {
		if (self::$instance === NULL) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	public function add($name, $href = false) {
		self::$breadcrumbs[] = $href ? HTML::anchor($href, $name, array('class' => 'breadcrumbs_link', 'title' => $name)) : $name;
		return $this;
	}

	public function remove($index = false, $name = false) {
		return $this;
	}

	public function get() {
		// поисковикам очень хорошо подсказать что это крошки, и использовать значек › - поисковики его любят ( проштудировал кучу ссылок )
		return '<div class="breadcrumbs">' . implode(' › ', self::$breadcrumbs) . '</div>';
	}

	public function get_breadcrumbs_array() {
		return self::$breadcrumbs;
	}

	// переопределим ВСЕ установленные вручную title, и сформируем их из "хлебных крошек"
	public static function add_to_title() {
		joosDocument::instance()
				->set_page_title(strip_tags(implode(' › ', self::$breadcrumbs)));
	}

}