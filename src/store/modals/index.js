import StoreModule from '../module';

class ModalsState extends StoreModule {
  initState() {
    return {
      name: null,
    };
  }

  open(name) {
    this.setState({ name }, `Открытие модалки ${name}`);
  }

  close() {
    if (!this.getState().name) return
    this.setState({ name: null }, `Закрытие модалки`);
  }
}

export default ModalsState;
