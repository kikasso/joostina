<?php

// запрет прямого доступа
defined( '_JOOS_CORE' ) or exit();

/**
 * Для вывода элемента перемещения объекта
 *
 * @version    1.0
 * @package    Plugins
 * @subpackage Autoadmin
 * @author     Joostina Team <info@joostina.ru>
 * @copyright  (C) 2007-2012 Joostina Team
 * @license    MIT License http://www.opensource.org/licenses/mit-license.php
 * Информация об авторах и лицензиях стороннего кода в составе Joostina CMS: docs/copyrights
 *
 * */
class pluginAutoadminTableOrdering implements joosAutoadminPluginsTable{

	public static function render( joosModel $obj , array $element_param , $key , $value , stdClass $values , $option ) {
		return '<img src="' . joosConfig::get( 'admin_icons_path' ) . '/cursor_drag_arrow.png" alt="' . 'Переместить' . '" />';
	}

}