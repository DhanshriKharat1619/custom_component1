(function () {
  if (!window.Formio) return;

  const TextFieldComponent = Formio.Components.components.textfield;

  class MyCustomComponent extends TextFieldComponent {

    static schema(...extend) {
      return TextFieldComponent.schema({
        type: 'mycustom',
        label: 'My Custom Field',
        key: 'mycustom',
        ...extend
      });
    }

    static get builderInfo() {
      return {
        title: 'My Custom Field',
        group: 'basic',
        icon: 'terminal',
        weight: 70,
        schema: MyCustomComponent.schema()
      };
    }

    render() {
      return super.render(`
        <input type="text" class="form-control" />
      `);
    }

    attach(element) {
      const input = element.querySelector('input'); // ✅ correct place

      if (input) {
        input.addEventListener('input', (e) => {
          this.setValue(e.target.value);
        });
      }

      return super.attach(element);
    }
  }

  Formio.Components.addComponent('mycustom', MyCustomComponent);
})();