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