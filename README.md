# Тестовый проект для KODE. 

### `Декомпозиция:` разбиение на подзадачи, их изначальная оценка и примерное время выполнения
Все временные рамки указанны с учетом поиска решения сложных моментов:
 1. Создание компонента авторизации и подтверждения по SMS с полной рабочей функциональностью и конечным дизайном этих двух компонентов. Не более 8 часов.
 2. Создание основного компонента для рендера карточек, копонента для селектов(фильтров). Не более 8 часов.
 3. Создание компонента пагинации карточек и отладка его взаимодейтсвия с другими компонентами. Не более 4 часов.
 4. Создание оставшихся мелких компонентов и функциональности: карточка с полной информацией, возможность быстрого просмотра карточки в модальном окне. Не более 4 часов.
 5. Тестирование и отладка функциональности всего приложения. Около 8 часов.
 6. Завершение верстки, улучшение дизайна и UI. Создание адаптивности. Около 6 часов.
 7. Публикация на gh-pages и проверка работы приложения с исправлением возможных ошибок при публикации. Не более 2-х часов.

 #### Общее время выполнения не более 40 часов.

Возникшие трудности укажу в самом конце файла*

### `Первое задание`
Ссылка на Codepen с решением первого задания: https://codepen.io/evgenyhalvin/pen/OJjVVeL
Времени было потрачено не более одного часа с учетом поиска самого компактного решения.

### `Второе задание`
### Описание
Проект для просмотра карточек с покемонами. Реализован на React.js. Перед просмотром карточек необходима авторизация и подтверждение через SMS. Загрузка данных карточек происходит при использовании публичного API. Функционал приложения позволяет просматривать подробную информацию карточек, фильтровать карточки по категориям и совершать быстрый просмотр карточек в модальном окне.

### Верстка
Адптиваная и кроссбраузерная верстка с разрешением от 320px до бесконечности.

### [Посмотреть проект](https://evgenyhalvin.github.io/kode-test/)
#### Логин: kode@kode.ru
#### Пароль: Enk0deng
#### Код подтверждения (он же будет выведен в консоль): 123456

### `Задания со звездочкой*`
Выполнил все задания со звездочкой. Ниже повторно перечислю их и дам к некоторым комментарии:

  – Компонент «Селект категорий» написан самостоятельно;

  – Пагинация карточек (сделал, но есть недоработка и сложность, о которой упомяну ниже);

  – Любые анимации интерфейса (валидация данных при входе повзволяет выявить ошибки, которые будут показаны пользователю в виде плавно появляющихся сообщений; также, анимации использованы в прелоадерах, например, перед загрузкой карточек на страницу – так, я даю понять пользователю, что что-то происходит и скоро будет выведен результат);

  – Быстрый просмотр покемона в модальном окне по клику на карточку (закрытие карточки по любой области вне самой карточки, а не только по крестику – необязательно же тренировать меткость пользователя);

  – Сохранение сессии авторизованного пользователя после закрытия вкладки браузера. Например, через local storage браузера (С таким был знаком, и знаю, что по-правильному проерка должна осуществляться через запрос к серверу; вдруг истек срок действия токена?);

  – Адптивный дизайн. Сделал, но всё по-легкому. Пример бОльшей адаптивности можно посмотреть на примере одной из моих коммерческих работ [здесь](https://alex-andreev-webme.github.io/kesha-project/index.html), где весь дизайн и адаптив был сделан мной.


### `Возникшие трудности`
Общая проблема – поддержание незапутанного взаимодействия компонентов. С ростом проекта, растёт количество стэйтов, из-за чего сложно было организовать работу функционала и не сильно усложнить приложение. Думаю, что эту проблему отлично решает библиотека Redux, которая позволяет избежать большого количества пропсов.
Непросто было сделать селекты для выбора категорий карточек. Такое я делал впервые. Многое тут переделывал, но нашел, как мне кажется, одно из компактных и правильных решений такого задания. Также впервые реализовал динамический роутинг(чем очень горжусь), но тут осталась нерешенная проблема с возвратом на первую страницу, а не на текущую после просмотра полной информации о покемоне. Всё остальное не вызвало каких-либо больших затруднений.
