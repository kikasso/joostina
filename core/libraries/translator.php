<?php defined('_JOOS_CORE') or exit();

/**
 * Локализация интерфейса
 *
 * @version    1.0
 * @package    Core\Libraries
 * @subpackage Translator
 * @category   Libraries
 * @author     Joostina Team <info@joostina.ru>
 * @copyright  (C) 2007-2012 Joostina Team
 * @license    MIT License http://www.opensource.org/licenses/mit-license.php
 * Информация об авторах и лицензиях стороннего кода в составе Joostina CMS: docs/copyrights
 *
 * */

/**
* Функция-обертка для joosTranslator::translate
*
*/
function _($str, array $params = array(), $language = LANG) {
    return joosTranslator::translate($str, $params, $language);
}


class joosTranslator {
        
        //массив с переводом фраз
        private static $_LANG = array ();

        /**
        * Перевод строки
        *
        * @param string $str - строка для перевода
        * @param array $params - параметры для замены в строке
        * @param string $language - язык локализации  
        *
        * @return string результат перевода
        */
	public static function translate($str, array $params = array(), $language = LANG) {
             //если установлен язык локализации то переводим
             if (LANG) 
                 $str = self::_translate($str, $language);
             
             if ($params)
                    $str = strtr($str, $params);
             
             return $str;
	}
        
        /**
        * Подгрузка файла локализации
        *
        * @param string $file_name - абсолюютный или относительный путь до файла
        * @param string $language - язык локализации 
        *
        * @return bool результат загрузки файла
        */
	public static function loadTranslation($file_name, $language = LANG) {
            if (joosFile::exists($file_name)) 
                require_once $file_name;
            else {
                joosDebug::add('Файла локализации '.$file_name.' не существует');
                return false;
            }
            
            if (!isset($_LANG) || !is_array($_LANG)) 
                throw new joosFileLibrariesTranslator('Файл локализации :file не устновленного формата', array(':file' => $file_name));
            
            if (isset(self::$_LANG[$language]))
                self::$_LANG[$language] = array_merge(self::$_LANG[$language], $_LANG);
            else
                self::$_LANG[$language] = $_LANG;
            
            return true;
	}
        
        /**
        * Внутренний метод перевода строки
        *
        * @param string $str - строка для перевода
        * @param string $language - язык локализации  
        *
        * @return string результат перевода
        */
        private static function _translate($str, $language){
            if (isset(self::$_LANG[$language][$str])) 
                $str = self::$_LANG[$language][$str];
            elseif (isset(self::$_LANG[$language]))
                joosDebug::add('Нет перевода фразы "'.$str.'" для локали "'.$language.'"');
            else
                joosDebug::add('Не загружен файл локализации для локали "'.$language.'"');
            
            return $str;
        }
}


/**
 * Обработчик ошибок для библиотеки joosTranslator
 */
class joosFileLibrariesTranslator extends joosException {

}