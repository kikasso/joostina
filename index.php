<?php
/**
 * Frontend - точка входа
 *
 * @package   Core
 * @author    JoostinaTeam
 * @copyright (C) 2007-2012 Joostina Team
 * @license   MIT License http://www.opensource.org/licenses/mit-license.php
 * Информация об авторах и лицензиях стороннего кода в составе Joostina CMS: docs/copyrights
 */
// Установка флага родительского файла
define('_JOOS_CORE', 1);

// рассчет памяти
function_exists('memory_get_usage') ? define('_MEM_USAGE_START', memory_get_usage()) : null;

$sysstart = TRUE ? microtime(true) : null;

// подключение главного файла - ядра системы
require_once __DIR__ . DIRECTORY_SEPARATOR . 'core' . DIRECTORY_SEPARATOR . 'joostina.php';
require_once JPATH_BASE . DS . 'core' . DS . 'front.root.php';

try{

    // запускаем контроллер
    joosController::run();
    echo joosController::render();
    
}catch (Exception $e){
    echo $e;
}

// вывод лога отладки
if (JDEBUG) {

	// подсчет израсходованной памяти
	if (defined('_MEM_USAGE_START')) {
		$mem_usage = ( memory_get_usage() - _MEM_USAGE_START );
		$mem_usage = joosFile::convert_size($mem_usage);
	} else {
		$mem_usage = 'недоступно';
	}

	// подсчет времени генерации страницы
	joosDebug::add_top(round(( microtime(true) - $sysstart), 5));
	joosDebug::add_top($mem_usage);

	// вывод итогового лога отлатчика
	joosDebug::get();
}