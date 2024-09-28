export const LANGUAGES = [
  { label: "Русский", code: "ru" },
  { label: "English", code: "en" },
]

export const config = {
  fallbackLang: 'ru',
  resources: {
    ru: {
      translation: {
        mainPageTitle: 'Магазин',
        basketTitle: 'Корзина',
        inBasket: 'В корзине',
        goods: {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        },
        empty: 'пусто',
        amount: 'Итого',
        pcs: 'шт',
        homePage: 'Главная',
        buttonAdd: 'Добавить',
        buttonDelete: 'Удалить',
        buttonOpen: 'Перейти',
        buttonClose: 'Закрыть',
        madeIn: 'Страна производитель',
        category: 'Категория',
        releasedInYear: 'Год выпуска',
        price: 'Цена',
      }
    },
    en: {
      translation: {
        mainPageTitle: 'Shop',
        basketTitle: 'Cart',
        inBasket: 'Cart',
        goods: {
          one: 'item',
          other: 'items',
        },
        empty: 'empty',
        amount: 'Amount',
        pcs: 'pcs',
        homePage: 'Home',
        buttonAdd: 'Add',
        buttonDelete: 'Delete',
        buttonOpen: 'Open',
        buttonClose: 'Close',
        madeIn: 'Manufacturer',
        category: 'Category',
        releasedInYear: 'Released in',
        price: 'Price',
      }
    }
  }
}