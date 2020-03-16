# Домашнее задание. Node.js

Сервер находится в ветке "node-server-dev". 

Нужно установить "del", "expres" и "axios"
```
npm install
```

Открыть файл ./server/authTokens/auth.token.js и в переменную authToken положить свой токен*. 

Запустить сервер:
```
node ./server/server.js
```

Дополнительно:
в запросах к API укажите параметр "не проверять сертификат":
- curl — добавьте параметр -k или --insecure
- модули https и request — добавьте параметр rejectUnauthorized: false

*Нужно передавать специальный токен в заголовке Authorization (например, Authorization: Bearer eyjhbgcioijiuzi1niisi, где "eyjhbgcioijiuzi1niisi" — это токен). Получить токен можно на страничке https://hw.shri.yandex. Для этого нужно залогиниться через GitHub. Скопируйте токен и сохраните его в файле ./server/authTokens/appalse.token.txt

Не сделано:
- offset и limit параметры в GET запросе к hw.shri.yandex/api/build/list 
- в информации о сборке нет полей start и duration
- постановка в очередь






# Домашнее задание. Адаптивная верстка.

Можно (и хотелось бы) использовать мою работу для примеров в разборе ДЗ. С отсылкой к моей работе по имени.

В папке src лежат 4 html-страницы и файл style.css, в который через @import подключаются другие css-файлы в нужном порядке. Там же в папке src/fonts лежат шрифты. Svg иконки заданы через html-теги и через css (background-image). Не знаю, что лучше, нужен разбор. 

## Вопросы и ответы:

### правильное использование БЭМ-сущностей

#### какие части макета являются одним и тем же блоком?

Принцип: блок это независимый кусок макета, его можно вставить в другой проект/страницу и css-стили сохранятся.

* Header (текст и кнопки в шапке макета)
* Footer (ссылки и копирайт внизу макета)
* NavLinks (блок ссылок в футере)
* BuildCard (карточка билда, на страницах build history и build details, в нее входит все, что обрамлено границей с тенью).
* TimeInfo внутри карточки билда блок с датой, временем и продолжительностью билда. Потому что повторяется в каждой карточке, а также может быть использован в другом проекте, и не обязательно быть связан с билдом (можно применить к тренировке, пробежке, сну). 
* Button Primary (кнопки Save, Cancel, Open settings, Show more, обязательное действие для продолжения работы)
* Button Secondary (кнопки Settings, Run build, Rebuild, дополнительные действия, не основные на странице)
* Container (это невидимая область, которая обрамляет содержимое Header, Footer, Main)
* на странице settings поле input с вышележащим заголовком (GitHub repository* и поле input, Build command и поле input, Main branch и поле input). У меня в коде нет блока под них, т.к. нет специфичных стилей.

#### какие стили относятся к блокам, а какие к элементам и модификаторам?

Стили блоков:
* размеры блока, высота и ширина
* расположение/позиционирование элементов внутри блока

Примеры:
```
.Container {
    max-width: 824px;
    width: 100%;
}
.Form {
    max-width: 474px;
    display: flex;
    flex-direction: column;   
}
```

Стили элементов:
* расположение относительно родительского блока, отступы от краев родительского блока, шрифты в случае, если это не нужно задавать через модификатор.

У меня в коде есть ситуации, когда через элемент блока ".Build-Info" задается положение внутрилежащих частей. 
```
/* тут указываем, как будут располагаться элементы внутри. То есть Build-Info выступает в роли контейнера. */
/* Роль контейнера могут брать на себя только блоки. Значит Build-Info - это блок? */
/* Но по смыслу Build-Info не существует сам по себе, это не блок */
/* это элемент Info, принадлежащий карточке билда Build. */
/* Не понимаю, как разрешаются эти противоречия. Help. */
.Build-Info {
    display: grid; 
    grid-gap: 8px; 
    grid-template-rows: 20px min-content; 
}

.Build-Title {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: 52px 1fr;
    align-items: center;
}
```

Стили модификаторов:
* цветовая схема (палитра) - цвет фона, цвет фона кнопок, цвет текста, цвет номера билда.
* отступы 
* межстрочные интервалы
* размеры текста
* шрифты
* скругления кнопок, input'ов и карточек билдов
* границы кнопок, форм
* тени (у карточек билдов в обычном состоянии и при наведении курсора мыши)
* выравнивание элемента или элементов относительно родительского блока


#### где нужно использовать каскады и почему?

Для задания иконки и цвета текста в карточке билда: success-зеленая, failed-красная, in progress-оранжевая:
```
.Build_status_success .Build-Icon { background-image: url(...); }
.Build_status_failed .Build-Icon { background-image: url(...); }
.Build_status_inProgress .Build-Icon { background-image: url(...); }

.Build_status_success .Build-Id { color: var(--color-build-success); }
.Build_status_failed .Build-Id { color: var(--color-build-failed); }
.Build_status_inProgress .Build-Id { color: var(--color-build-in-progress); }
```

### консистентность
#### какие видите базовые и семантические константы?

* Цвета. Базовые константы цветов в файле colors.css. Семантические - в начале файлов Button.css, BuildStatuses.css, Form.css и т.д. почти в каждом файле задаются семантические цвета на основе базовых.
* Тени. Базовые тени в файле box-shadow.css. Семантические создаются и применяются в BuildList.css.
* Скругления. Базовые и семантические в файле border-radius.css
* Границы кнопок и input'ов. В файле border.css.
* Отступы. В файле margin.css. Не сделано (только начала выделять общие константы, в коде отступы пишутся в блоках и в элементах).
* Шрифты. В файле fonts.css. Задаются через модификаторы, но кроме Form. Мне показалось, что удобнее элементах Form-Label, Form-Input, Form-Title задать размеры шрифтов, потому что они если и будут меняться, то сразу для элементов формы. Но есть вопрос про кнопки. См ниже.

#### какие видите закономерности в интерфейсе?
Скругления кнопок и скругления input равны между собой (4px) и они меньше, чем скругления у карточки билда (6px). 

Отступы пропорциональны размеру контейнера. Например, в карточке билда на десктоп-версии в нижнем левом углу отступ - это сильно вытянутый прямоугольник, похожий по форме на карточку билда. А в мобильной версии отступ по высоте больше, поэтому выглядит более квадратно, и это более похоже на форму карточки билда на мобильной версии. В мобильной версии отступ снизу = 16px, вместо 12px на десктопе.

Кнопки. 
У primary кнопок padding справа и слева = 20px. У secondary кнопок отступ справа 13px, слева иконка, в мобильной версии текст кнопки пропадаетю. Отступы иконок от края по 8px.
Если кнопка основная, подразумевает продолжение работы, то она желтая. Если кнопка для второстепенной функциональности, то она серая. 
Цвет иконки на иконке кнопки Rebuild черный, а на иконках кнопок Run build и Settings - #111111 почти черный. Видимо, это для того, чтобы показать, что Rebuild на страницe с build details имеет больший вес, чем кнопка Settings, и чем кнопка Run build на странице build history. У меня в коде это задано через svg, там есть цвет  

На экране с коммитами кнопка "Show more" имеет странные размеры (высоту) в десктопе и мобильных. Она отличается от других кнопок. Мне не нравится, что эта кнопка в мобильной версии похожа на кнопки Save, Cancel по отступам и высоте, а в десктопной версии похожа на кнопки  Rebuild, Run build. По смыслу эта кнопка больше походит на Save и Cancel внизу формы, чем на Run build и Rebuild. Она предполагает некоторое действие после изучения содержимого страницы, также как Save и Cancel. Но в коде я ей указываю цвет secondary серый.

Цвет текст в карточке билда: самый важный текст - цветной (зеленый, оранжевый, красный), основной текст - черный, менее важный текст - серый, а иконки - светло-серым, потому что имеют самый меньший вес.

### адаптивность
#### где видите вариативность данных и как это обрабатываете?
карточки с билдами меняются. В зависимости от того, прошел билд или нет или выполняется, будет разная иконка и разный цвет номера билда. Это делаю через каскад (см.выше).

Еще на странице build_history все карточки почти одинаковы, отличаются только несколькими полями внутри html-тегов. Можно было сделать цикл по json и создавать html из шаблона. Но раньше это не делала и дз не про javascript, поэтому эту вариативность данных никак не обработала.

#### какие видите особенности, связанные с размером экрана?

start screen: можно сужать экран до 300 пикселей и ничего не менять. Ширина заголовка 180px + ширина кнопки Settings 87px + отступ между ними размером с кнопку 87px = округленно  360 px. Ширина картинки и текста на мобильном экране меньше 300px, поэтому тут брекпоинт можно сделать равным 360px. Внизу футер тоже уместится, его контент меньше 300px в ширину на десктопе.

settings: самый широкий элемент - это форма с input'ами, 474px. На мобильном экране - ширина input'ов  288px. Значит брекпоинт в 360 подойдет. Можно сужать input c 474px до 360px, потом поменять размер шрифта, потом дальше подгонять ширину под размер устройства.

build history: тут видно, что максимальная ширина контента 824px, по бокам отступы. Если экран будет шире, то контент все равно будет 824px. И это для всех страниц. Зафиксируем в выводах. Также, если экран будет сужаться, первыми будут переноситься слова в названии билда. Далее при ширине в 360px блоки перестроятся, как на макете мобильной версии. Если будет очень длиннный текст коммита или длинное имя автора, то они будут переноситься по словам.

build details: аналогично предыдущему, брекпоинт в 360px. И нужен горизонтальный скрол у поля с логом, когда текст не будет помещаться в поле по ширине, не зависимо от брекпоинтов. Наверно, это в javascript только можно сделать?

Выводы: на десктопе max ширина экрана 824px, на мобильном - то что осталось после того, как применили отступы. Брекпоинт - 360px, после него применяется лэйаут с мобильной версии макета.

Для взаимного рапсоложения элементов в карточке билда использовала display: grid, все элементы сгруппировала на блоки, их взаимное расположение меняется в зависимости от ширины экрана. Сужала окно браузера и смотрела, в каком порядке лучше расположить блоки, чтобы в итоге на самом узком экране получить тоже, что на макете. А на промежуточных экранах есть расхождение с макетом, но зато видно все блоки. Например, название и автор коммита перестают быть выровненными в одну линию, перемещаются друг под друга на экранах шириной 540px.

#### что еще повлияло на вашу вёрстку?

дедлайн, чат с шри-ребятами.

#### TODO

Не сделано:
* иконка для удаления введенного в input текста. Вместо нее стандартный крестик, который отображается, если указать input type="search".

#### Мои вопросы

1.  у всех кнопок размер шрифта одинаковый, 13px. С одной стороны это одинаковое поведение для всех кнопок, значит можем его задать в блоке Button:
```
.Button{ font-size: 13px }
```
С другой стороны, в будущем шрифты каких-то кнопок могут измениться, и тогда правильнее указать через модификатор
```
.Button_fontSize_s { font-size: 13px; }
```
 Как правильно?

