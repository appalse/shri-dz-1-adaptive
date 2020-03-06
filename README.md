# Домашнее задание. Адаптивная верстка.

Используйте мою работу для примеров на разборе ДЗ, пожалуйста. Можно сказать, что работа моя, так будет сразу понятно, где у меня была ошибка.

## Вопросы и ответы:

### правильное использование БЭМ-сущностей

#### какие части макета являются одним и тем же блоком?
* верх макета, шапка, как бы header (1 стр.: заголовок School CI server + кнопка Settings, 2 стр.: заголовок School CI server без кнопок, 3 стр.: название репозитория + кнопки Run build и настройки, 4 стр.: название репозитория + кнопки Rebuild и настройка). Потому что тут выведены название страницы и основные функции.
* низ макета, подвал, как бы footer (ссылки Learning и Support + копирайт на всех страницах). Потому что одинаковый на каждой странице.
* копирайт внизу страницы, он блок сам по себе: переиспользуется на каждой странице и может быть использован в других проектах. **Не уверена, нужен комментарий в разборе ДЗ.**
* блок ссылок Support, Learning внизу страницы: переиспользуется на каждой странице, его можно целиком переместить в другое место, в другой проект. **Не уверена, нужен комментарий в разборе ДЗ.**
* кнопки Settings, Open settings, кнопки с иконками шестеренки. Потому что это кнопки, отвечающие за открытие формы с настройками.
* кнопки Run build, Rebuild, кнопки с иконками play/стрелочек по кругу. Потому что это кнопки, отвечающие за какую-то функциональность, которая будет запускаться на сервере.
* кнопки Save, Cancel, Show More: они находятся внизу контейнера и предполагают какие-то дальнейшие действия после окончания работы с контейнером (заполнили форму и нажали Save/Cancel, просмотрели список билдов и нажали Show More).
* карточка билда: это как со списком отзывов отеля из лекции, похожие друг на друга элементы, их много, список.
* на странице settings поле input с вышележащим заголовком (GitHub repository* и поле input, Build command и поле input, Main branch и поле input)
* внутри карточки билда блок с датой, временем и продолжительностью билда. Потому что повторяется в каждой карточке, а также может быть использован в другом проекте, и не обязательно быть связан с билдом (можно применить к тренировке, пробежке, сну). **Не уверена, нужен комментарий в разборе ДЗ.**

#### какие стили относятся к блокам, а какие к элементам и модификаторам?

Стили блоков:
* размеры контейнеров, высота и ширина, расположение самого блока (позиционирование и выравнивание элементов внутри, если не задан модификатор)

Стили элементов:
* размеры, высота и ширина, расположение относительно родительского блока в случае, если это не нужно задавать через модификатор.

стили текста билда (страница build details) - это стили элемента. Без карточки билда текст билда не существует. Поэтому текст билда - это элемент. 

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

У всех карточек билдов и поля с логом билда есть скругление border-radius = 6px, кроме лога билда на мобильном экране. Поэтому каскад будет использоваться для лога билда, для мобильной версии, чтобы отменить скругление. На мобильной версии лог прижимается к краю экрана, поэтому скругление неуместно.

--

Если я правильно понимаю, то каскады - это когда несколько css-правил применяются к одному html-элементу и какое-то одно из них перекрывает все остальные. Например, у html-элемента указано 2 класса class="Button Button-concise", и в css заданы color для каждого класса:
```
.Button { color: red; }
.Button-concise { color: green; }
```
Каскад делает так, что по определенным правилам будет выбрано одно значение color.

А вложенные селекторы - это не каскад. И вложенные селекторы - это плохая практика в БЭМ. Лучше добавить новый класс у html-элемента, в него записать css-свойства, чем писать вложенные селекторы. 

Каскад в БЭМ - это когда есть css-правило для блока или элемента, например, кнопка содержит текст и иконку, и в определенных ситуациях нам приходится его изменять css-правило за счет модификатора, например, убирать у кнопки текст, оставляя одну иконку.


### консистентность
#### какие видите базовые и семантические константы?

Цвета кнопок
| База | Семантика |
|------|-----------|
| желтый #FFCC00 фон + черный текст | основная функция на странице, пользователь изучил содержимое страницы, что-то почитал или заполнил, и нужно нажать эту кнопку, чтобы перейти далее к работе |
| серый #E6E6E6 фон + черный текст + черная иконка (Rebuild) | второстепенная функциональность, пользователь может работать со страницей и не нажимать ее, если нажимает, то никуда не переходит, задача запускается в фоне |
| серый #E6E6E6 фон + черный текст + темная #111111 иконка (Settings, Run build) | дополнительная функциональность, еще менее важная, чем второстепенная, не очень важная для открытой страницы, запускает работу в фоне или открывает страницу |

Цвета иконок у билдов
| База | Семантика |
|------|-----------|
| зеленый #00B341 | билд прошел |
| оранжевый #FF9A00 | билд исполняется |
| красный #FF3333 | билд упал |

Цвет иконок человечка и коммита в карточке билдов
| База | Семантика |
|------|-----------|
| серый #B3B3B3 | Secondary цвет, связанный с системой контроля версий |

Цвет иконок календаря и часов в блоке с временем билда в карточке билдов
| База | Семантика |
|------|-----------|
| серый #CECECE | Цвет, связанный с блоком времени |

Цвет фона
| База | Семантика |
|------|-----------|
| серый #F2F2F2 | цвет фона подложки, фон текста |
| серый #F0F2F3 | цвет фона футера |

Цвет текста
| База | Семантика |
|------|-----------|
| серый #7F8285 | цвет текста заголовка, подзаголовков и футера |
| красный #E00000 | цвет текста футера при наведении мыши |
| серый #CCCCCC | цвет текста placeholder'а |
| черный | основной текст в карточке билда, в заголовках input, в кнопках, в описаниях |
| серый #595959 | второстепенный, менее важный текст в карточке билда |
| серый #939393 | Secondary цвет для карточки билда, не используется в макете, но есть в Frame 1 |

Бордеры и контролы
| База | Семантика |
|------|-----------|
| серый #A9A9A9 | горизонтальный скролл лога билда на мобильном экране |
| серый #B3B3B3 (уже был выше) | цвет границы активного input, в который вводится текст |
| серый #D9D9D9 | цвет границы input обычный |
| серый #CCCCCC | цвет иконки внутри input, чтобы стереть текст |
| красный #FF3333 (уже был выше) | обязательное для заполнения поле |

Скругления
| База | Семантика |
|------|-----------|
| 4px | скругления кнопок |
| 4px | скругления input'ов |
| 6px | скругления карточек билдов |
| 100px | скругления горизонтального скролла |

Отступы
| База | Семантика |
|------|-----------|

Размеры текста, шрифты, межстрочные интервалы
| База | Семантика |
|------|-----------|
| font-size: 24px; line-height: 28px; | размер заголовка |
| font-size: 24px; line-height: 30px; | размер заголовка билда |
| font-size: 18px; line-height: 22px; | размер заголовка на мобильном экране, в т.ч. заголовка билда |
| font-size: 13px; line-height: 125%; | размер текста |
| font-size: 13px; line-height: 36px; | размер текста кнопки |
| font-size: 13px; line-height: 28px; | размер текста кнопок на десктоп версии Show more, Rebuild, Run build |
| font-size: 13px; line-height: 16px; | размер ссылок в футере в десктопе |
| font-size: 13px; line-height: 18px; | размер текста в футере |
| font-size: 15px; line-height: 20px; | размер подзаголовка формы |
| font-size: 13px; line-height: 18px; | размер текста описаниии в форме |
| font-size: 13px; line-height: 15px; | размер текста внутри input  |
| font-size: 13px; line-height: 18px; | размер подзаголовка input, текста вокруг input  |
| font-size: 18px; line-height: 20px; | размер текста номера билда в карточке билда |
| font-size: 16px; line-height: 16px; | размер текста номера билда в карточке билда на мобильной версии |
| font-size: 15px; line-height: 20px; | размер текста имени билда в карточке билда |
| font-size: 13px; line-height: 16px; | размер текста коммита и юзера в карточке билда |
| font-size: 13px; line-height: 16px; | размер текста в блоке с временем |
| font-size: 10px; line-height: 20px; | размер текста лога билда |


Границы кнопок и форм
| База | Семантика |
|------|-----------|
| none | отсутствуют границы у кнопок |
| 2px solid | граница input блока |

Тени
| База | Семантика |
|------|-----------|
| box-shadow: 0px 1px 1px rgba(67, 68, 69, 0.3), 0px 0px 1px rgba(67, 68, 69, 0.3) | тень у карточки билда |
| box-shadow: 0px 2px 8px rgba(67, 68, 69, 0.3), 0px 0px 1px rgba(67, 68, 69, 0.3) | тень у карточки билда, на которую наведен курсор мыши, активная карточка |




#### какие видите закономерности в интерфейсе?
во всех местах макета отступы от текста кнопки - 13px, отступы от иконок по 8

font-size тайтла School CI server на start screen desktop, и settings desktop разный. 18 везде на тачах, на десктопах везде 24

лог билда: пробелы/переносы строк должны сохраняться, цвета/жиный текст — не нужно

На экране с коммитами кнопка "Show more" имеет странные размеры (высоту) в десктопе и мобильных. Она отличается от других кнопок


### адаптивность
#### где видите вариативность данных и как это обрабатываете?
карточки с билдами меняются. В зависимости от того, прошел билд или нет или выполняется, будет разная иконка и разный цвет номера билда. Это будет модификатором. 

#### какие видите особенности, связанные с размером экрана?

start screen: можно сужать экран до 300 пикселей и ничего не менять. Ширина заголовка 180px + ширина кнопки Settings 87px + отступ между ними размером с кнопку 87px = округленно  360 px. Ширина картинки и текста на мобильном экране меньше 300px, поэтому тут брекпоинт можно сделать равным 360px. Внизу футер тоже уместится, его контент меньше 300px в ширину на десктопе.

settings: самый широкий элемент - это форма с input'ами, 474px. На мобильном экране - ширина input'ов  288px. Значит брекпоинт в 360 подойдет. Можно сужать input c 474px до 360px, потом поменять размер шрифта, потом дальше подгонять ширину под размер устройства.

build history: тут видно, что максимальная ширина контента 824px, по бокам отступы. Если экран будет шире, то контент все равно будет 824px. И это для всех страниц. Зафиксируем в выводах. Также, если экран будет сужаться, первыми будут переноситься слова в названии билда. Далее при ширине в 360px блоки перестроятся, как на макете мобильной версии. Если будет очень длиннный текст коммита или длинное имя автора, то они будут переноситься по словам.

build details: аналогично предыдущему, брекпоинт в 360px. И нужен горизонтальный скрол у поля с логом, когда текст не будет помещаться в поле по ширине, не зависимо от брекпоинтов. Наверно, это в javascript только можно сделать?

Выводы: на десктопе max ширина экрана 824px, на мобильном - то что осталось после того, как применили отступы. Брекпоинт - 360px, после него применяется лэйаут с мобильной версии макета.

#### что еще повлияло на вашу вёрстку?

Подсказали, что надо будет перенести на react то, что сейчас верстаем. Поэтому лучше брать нотацию BEM React.

В прошлом месяце я делала тестовое задание в одну компанию, (верстка по psd-макету)[https://appalse.ru/cgi-bin/flask-wrapper.fcgi/sportmaster/]. Сначала пыталась выделить блоки, элементы, модификаторы, константы для палитры. Потом по мере написания кода получилась такая каша. То в одном месте нельзя просто в блоке указать все нужные css-свойства, надо еще в дочерних элементах указывать, и переменных получилось так много, что все скатилось к примитивному "написал класс в html-элементе, описал css-правила". Поэтому было бы очень здорово узнать о своих ошибках.  
