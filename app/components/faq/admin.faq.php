<?php
/**
 * Job - Компонент вакансий
 * Контроллер админ-панели
 *
 * @version 1.0
 * @package Joostina.Components
 * @subpackage Job
 * @author Joostina Team <info@joostina.ru>
 * @copyright (C) 2008-2011 Joostina Team
 * @license MIT License http://www.opensource.org/licenses/mit-license.php
 * Информация об авторах и лицензиях стороннего кода в составе Joostina CMS: docs/copyrights
 *
 **/
// запрет прямого доступа
defined('_JOOS_CORE') or die();

class actionsFaq {

	/**
	 * Название обрабатываемой модели
	 */
	public static $model = 'adminFaq';
	
	/**
	 * Подменю
	 */	
	public static $submenu = array(
		'faq' => array(
			'name' => 'Все вопросы',
			'href' => 'index2.php?option=faq',
			'active' => false
		),
		'params' => array(
			'name' => 'Настройки',
			'href' => 'index2.php?option=params&group=faq',
			'active' => false
		),
		'metainfo' => array(
			'name' => 'Метаданные по-умолчанию',
			'href' => 'index2.php?option=metainfo&group=faq',
			'active' => false
		),
	);
	
	/**
	 * Тулбары
	 */	
	public static  $toolbars = array();
	
	
	/**
	 * Выполняется сразу после запуска контроллера
	 */
	public static function on_start() {		
		joosLoader::admin_model('faq');
	}	
			

	/**
	 * Список объектов
	 * 
	 * @param string $option
	 */
	public static function index($option) {

		ob_start();	mosMenuBar::copy();	$add = ob_get_contents(); ob_end_clean();
		JoiAdminToolbar::add_button($add);
		
		//установка подменю
		self::$submenu['faq']['active'] = true;
		
		$obj = new self::$model;
		
		//количество записей
		$obj_count = JoiAdmin::get_count($obj);

		//инициализируем постраничную навигацию
		$pagenav = JoiAdmin::pagenav($obj_count, $option);

		//параметры запроса на получение списка записей
		$param = array(
			'offset' => $pagenav->limitstart,
			'limit' => $pagenav->limit,
			'order' => 'id DESC'
		);
        
		//получаем массив объектов
		$obj_list = JoiAdmin::get_list($obj, $param);

        //Массив названий элементов для отображения в таблице списка
        $fields_list = array('id', 'question', 'username', 'created_at',  'state');
        //Передаём информацию о объекте и настройки полей в формирование представления
        JoiAdmin::listing( $obj, $obj_list, $pagenav, $fields_list );	
	}
	
	/**
	 * Создание объекта
	 * 
	 * @param string $option
	 */
	public static function create($option) {
		self::edit($option, 0);
	}

	/**
	 * Редактирование объекта
	 * 
	 * @param string $option
	 * @param integer $id - номер редактируемого объекта
	 */
	public static function edit($option, $id) {
		
		$obj_data = new self::$model;
		
		$id > 0 ? $obj_data->load($id) : null;

		//Мета-информация
		$obj_data->metainfo = Metainfo::get_meta('faq', 'item', $obj_data->id);

        //Передаём данные в формирование представления
        JoiAdmin::edit($obj_data, $obj_data);
	}

	/**
	 * Сохранение информации
	 * 
	 * @param string $option
	 * @param integer $redirect
	 */
	private static function save_this($option, $redirect = 0){
		
		joosSpoof::check_code();

		$obj_data = new self::$model;
		
		//сохраняем основные данные
		$result = $obj_data->save($_POST);
		
		//Сохранение мета-информации
		Metainfo::add_meta($_POST['metainfo'], 'faq', 'item', $obj_data->id);

		if ($result == false) {
			echo 'Ошибочка: ' . database::instance()->get_error_msg();
			return;
		}
		
		switch ($redirect) {
			default:
			case 0: // просто сохранение
				return mosRedirect('index2.php?option=' . $option . '&model=' . self::$model, 'Всё ок!');
				break;

			case 1: // применить
				return mosRedirect('index2.php?option=' . $option . '&model=' . self::$model . '&task=edit&id=' . $obj_data->id, 'Всё ок, редактируем дальше');
				break;

			case 2: // сохранить и добавить новое
				return mosRedirect('index2.php?option=' . $option . '&model=' . self::$model . '&task=create', 'Всё ок, создаём новое');
				break;
		}		
				
	}

	/**
	 * Сохранение отредактированного или созданного объекта 
	 * и перенаправление на главную страницу компонента
	 * 
	 * @param string $option
	 */
	public static function save($option) {		
		self::save_this($option);
	}
	

	/**
	 * Сохраняем и возвращаем на форму редактирования
	 * 
	 * @param string $option
	 */
	public static function apply($option) {
		return self::save_this($option, 1);
	}

	/**
	 * Сохраняем и направляем на форму создания нового объекта
	 * 
	 * @param mixed $option
	 */
	public static function save_and_new($option) {
		return self::save_this($option, 2);
	}


	/**
	 * Удаление объекта или группы объектов, возврат на главную
	 * 
	 * @param string $option
	 * @return
	 */
	public static function remove($option) {
		joosSpoof::check_code();

		//идентификаторы удаляемых объектов
		$cid = (array) joosRequest::array_param('cid');

		$obj_data = new self::$model;

		$redirect = 'index2.php?option=' . $option;

        if($obj_data->delete_array($cid, 'id')){
            mosRedirect($redirect, 'Удалено успешно!');
        } 
        else{
            mosRedirect($redirect, 'Ошибка удаления');
        }  
	}

	/**
	 * Копирование объекта или группы объектов, возврат на главную
	 *
	 * @param string $option
	 * @return
	 */
	public static function copy($option) {
		joosSpoof::check_code();

		//идентификаторы удаляемых объектов
		$cid = (array) joosRequest::array_param('cid');

		$obj_data = new self::$model;

        if($obj_data->copy_array($cid, 'id')){
            mosRedirect('index2.php?option=' . $option, 'Скопировано успешно!');
        }
        else{
            mosRedirect('index2.php?option=' . $option, 'Ошибка копирования');
        }
	}
	
}