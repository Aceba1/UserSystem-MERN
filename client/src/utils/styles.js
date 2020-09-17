// TODO: Adapt styles to actual CSS, use classNames to dynamically style elements

const def = {
  app: {
    display: 'block',
    maxWidth: 500,
    //width: 'max-width',
    margin: 'auto',
    marginTop: 32,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
    fontFamily: 'verdana',
    height: '100%',
    borderRadius: 16,
    boxShadow: "0px 2px 4px 2px #444"
  },

  warning: {
    display: 'block',
    width: 'max-content',
    marginTop: 16,
    marginBottom: 16,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    backgroundColor: '#f314',
    borderWidth: 2,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#f31b'
  },

  warningItem: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    margin: 4,
    fontFamily: 'verdana',
  },

  button: {
    //margin: 12,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    margin: 2,
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'verdana'
  },

  input: {
    display: 'block',
    margin: 12,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
    fontFamily: 'verdana'
  }
};

const light = {
  app: {...def.app, ...{
    backgroundColor: '#fff',
    color: '#000'
  }},
  button: {...def.button, ...{
    borderColor: '#000',
    backgroundColor: '#eee',
    color: '#222',
  }},
  input: {...def.input, ...{
    borderColor: '#444',
    backgroundColor: '#fff',
    color: '#000',
  }},
  warning: {...def.warning, ...{
  }},
  warningItem: {...def.warningItem, ...{
  }},
};

const dark = {
  app: {...def.app, ...{
    backgroundColor: '#000',
    color: '#fff'
  }},
  button: {...def.button, ...{
    borderColor: '#ddd',
    backgroundColor: '#222',
    color: '#eee',
  }},
  input: {...def.input, ...{
    borderColor: '#bbb',
    backgroundColor: '#000',
    color: '#fff',
  }},
  warning: {...def.warning, ...{
  }},
  warningItem: {...def.warningItem, ...{
  }},
};

export default class Styler {
  static currentStyle = light;
  static dark = dark;
  static light = light

  // static setDark() {
  //   Styler.currentStyle = {...dark};
  //   console.log(Styler.currentStyle)
  // }

  // static setLight() {
  //   Styler.currentStyle = {...light};
  //   console.log(Styler.currentStyle)
  // }
}