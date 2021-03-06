<?php defined('_JOOS_CORE') or exit();

/**
 * Компонент новостей - шаблон панели управления для просомтра информации о компоненте ( task=info )
 *
 * @version    1.0
 * @package    Components\Blogs
 * @subpackage Views\Admin
 * @copyright Авторские права (C) 2007-2010 Joostina team. Все права защищены.
 * @license   Лицензия http://www.gnu.org/licenses/gpl-2.0.htm GNU/GPL, или help/license.php
 * Joostina! - свободное программное обеспечение распространяемое по условиям лицензии GNU/GPL
 * Для получения информации о используемых расширениях и замечаний об авторском праве, смотрите файл help/copyright.php.
 */
?>
<div class="page-header">
    <ul class="nav nav-pills" style="float: right">
        <?php foreach(joosAdminView::get_submenu() as $submenu_item): ?>
        <li <?php echo ($submenu_item['active'] == false) ? '' : 'class="active"' ?>>
            <a href="<?php echo $submenu_item['href'] ?>">
                <?php echo $submenu_item['name'] ?>
            </a>
        </li>
        <?php endforeach ?>
    </ul>
    <h2><?php echo joosAdminView::get_component_title() .' / '. joosAdminView::get_component_header() ?></h2>
</div>
    
Информация о компоненте блогов