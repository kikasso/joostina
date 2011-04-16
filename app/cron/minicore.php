<?php

/**
 * @package Joostina
 * @copyright Авторские права (C) 2007-2010 Joostina team. Все права защищены.
 * @license Лицензия http://www.gnu.org/licenses/gpl-2.0.htm GNU/GPL, или help/license.php
 * Joostina! - свободное программное обеспечение распространяемое по условиям лицензии GNU/GPL
 * Для получения информации о используемых расширениях и замечаний об авторском праве, смотрите файл help/copyright.php.
 */
// Установка флага родительского файла 
define('_JOOS_CORE', 1);

define('DS', DIRECTORY_SEPARATOR);
define('JPATH_BASE', dirname(dirname(__FILE__)));

require_once (JPATH_BASE . DS . 'includes' . DS . 'route.php');
require_once (JPATH_BASE . DS . 'includes' . DS . 'joostina.php');
