<?php
defined('_JOOS_CORE') or exit();

$option = joosController::$controller;
$task = joosController::$task;

echo '<?xml version="1.0" encoding="UTF-8"?' . '>' . "\n";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<?php
		echo joosDocument::head();

		joosDocument::instance()->add_css(JPATH_SITE . '/app/templates/joostina/css/template.css?v=3', array('media' => 'all'));

		echo joosDocument::stylesheet();
		?>
		<!--[if IE 7]>
		<link rel="stylesheet" href="<?php echo JPATH_SITE ?>/app/templates/joostina/css/ie.css" type="text/css"
			  media="screen, projection"/>
		<![endif]-->
		<?php echo joosDocument::head_data(); ?>
		<base href="<?php echo JPATH_SITE ?>"/>
		<script type="text/javascript">var _live_site = '<?php echo JPATH_SITE; ?>'</script>
	</head>

	<body class="<?php echo $option ?> <?php echo $option != 'mainpage' ? 'inside' : '' ?>">

		<!--[1]#wrapper::BEGIN-->
		<div id="main_wrap">

			<!--[2]#header::BEGIN-->
			<div id="header">
				<div id="top" class="wrapper">
					<a class="logo" href="<?php echo JPATH_SITE ?>">&nbsp;</a>

					<div class="right_part"><?php joosModule::load_by_id(4); ?></div>
				</div>
				<div class="topmenu">
					<div class="wrapper"><?php joosModule::load_by_id(3); ?></div>
				</div>
			</div>
			<!--[2]#header::END-->

			<!--[2]#promo::BEGIN-->
			<div id="promo">
				<div class="wrapper">
					<?php joosModule::load_by_id(111); ?>
				</div>
			</div>
			<!--[2]#promo::END-->

			<!--[2]#content_wrap::BEGIN-->
			<div id="content_wrap">
				<!--[3].container, #content::BEGIN-->
				<div class="container">
					<div id="content">
						<div class="breadcrumbs"><?php joosModule::load_by_position('pathway') ?></div>

						<div id="component" class="frontpage">
							<?php if (joosController::$controller == 'mainpage'): ?>

								<div class="module m-about">
									<span class="h2">О проекте</span>

									<p>В первую очередь, Joostina - это русскоязычный OpenSource-проект, развивающийся силами
										безгранично любящих его людей. А во вторую очередь - это <strong>профессиональная, быстрая и
											современная система управления сайтами</strong>.</p>

									<p>В процессе развития, мы пытаемся поддерживать систему в состоянии, когда она:</p>
									<ul>
										<li>одинаково удобна как для пользователей, так и для разработчиков;</li>
										<li>универсальна не в ущерб скорости работы</li>
										<li>оптимизирована под нагрузки и готова с радостной улыбкой встретить тысячи посетителей
										</li>
									</ul>
								</div>

								<div class="module m-news">
									<ul class="listreset listblock listdotted">
										<li>
											<span class="el-date"><em>14/</em>01 &mdash;</span>
											<a href="#">Joostina 1.3.0.4 stable</a>
										</li>
										<li>
											<span class="el-date"><em>14/</em>01 &mdash;</span>
											<a href="#">Joostina 1.3.0.4 stable</a>
										</li>
										<li>
											<span class="el-date"><em>14/</em>01 &mdash;</span>
											<a href="#">Joostina 1.3.0.4 stable</a>
										</li>
										<li>
											<span class="el-date"><em>14/</em>01 &mdash;</span>
											<a href="#">Joostina 1.3.0.4 stable</a>
										</li>
									</ul>
									<a class="m-news_all" href="#">все новости</a>
								</div>

							<?php else: ?>
								<?php echo joosDocument::body(); ?>
							<?php endif; ?>
						</div>
					</div>
				</div>
				<!--[3].container, #content::END-->

				<!--[3]#sidebar::BEGIN-->
				<div id="sidebar">

					<div id="sidebar_content">
						<?php joosModule::load_by_position('right') ?>
					</div>
				</div>
				<!--[3]#sidebar::END-->

			</div>
			<!--[2]#content_wrap::END-->

			<!--[2]#bottom::BEGIN-->
			<div id="bottom">
				<div class="wrapper">


				</div>
			</div>
			<!--[2]#bottom::END-->

		</div>
		<!--[1]#wrapper::END-->


		<!--[1]#footer::BEGIN-->
		<div id="footer">
			<div class="wrapper">

				<div class="b-copyrights">
					<a href="mailto:info@joostina.ru" id="email_us">Написать письмо</a>
					Joostina CMS &copy; 2007-2012
				</div>
			</div>
		</div>
		<!--[1]#footer::END-->

		<?php
		joosDocument::instance()
				->add_js_file(JPATH_SITE . '/media/js/jquery.js', array('first' => true));

		echo joosDocument::javascript();
		echo joosDocument::footer_data();
		?>
	</body>
</html>