/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

// Дерево на основе плоской структуры, где каждый элемент имеет ссылку на родительский
export class DataTree {
  isRoot = true;
  parent = null;
  children = [];
  // Уровень вложенности узла
  level = 0;

  constructor(
    dataset = [],
    idKey = '_id',
    getParentId = (el) => el.parent?._id,
  ) {

    // Заполняем дерево узлами
    this.fillFromFlatArray(dataset, idKey, getParentId)

    // Устанавливаем уровни вложенности узлам
    this.traversal((node) => {
      node.level =
        node.parent?.level + 1 ||
        this.getEnclosureCount(node)
    })
  }

  // Создаём хэш-таблицу узлов дерева
  prepareNodeHashTable(dataset, idKey) {
    const hashTable = {}

    dataset.forEach(aData =>
      hashTable[aData[idKey]] = {
        //! Поверхностное копирование
        data: { ...aData },
        children: [],
        parent: null,
        level: null,
      }
    );
    return hashTable
  }

  // Строит дерево из плоского массива и добавляет к текущему дереву (this)
  fillFromFlatArray(
    dataset = [],
    idKey = '_id',
    getParentId = (el) => el.parent?._id,
  ) {

    const hashTable = this.prepareNodeHashTable(dataset, idKey)

    // Перебираем данные узлов и создаём узлы на их основе
    dataset.forEach(aData => {
      const id = aData[idKey]
      const parentId = getParentId(aData)

      if (parentId) {
        hashTable[id].parent = hashTable[parentId]
        hashTable[parentId].children.push(hashTable[id])
      } else {
        hashTable[id].parent = this
        this.children.push(hashTable[id])
      }
    });

    return this
  }

  // Вычисление количества вложенностей узла
  getEnclosureCount(node) {
    return node.parent
      ? getEnclosureCount(node.parent) + 1
      : 0
  }

  // Обход дерева в глубину
  // Возвращает результат выполнения processNode на верхнем уровне
  traversal(processNode = (node) => node, tree = this) {
    // ...обработка данных узла...
    const res = processNode(tree)

    // если потомков нет, завершить функцию
    if (!tree.children) return res

    // последовательно обходим потомков
    for (const node of tree.children) {
      this.traversal(processNode, node) // рекурсия
    }

    return res
  }

  // Замыкание для сбора массива 
  flatter() {
    const arr = []
    return (el) => {
      arr.push(el)
      return arr
    }
  }

  // Получение массива узлов дерева (кроме корня) методом обхода в глубину
  toFlatArray() {
    return this.traversal(this.flatter()).slice(1)
  }
}


