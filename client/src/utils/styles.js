const def = {
  app: {
    display: 'block',
    width: 'max-width',
    margin: 0,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 'auto',
    fontFamily: 'verdana',
    height: '100%'
  },

  warning: {
    display: 'block',
    padding: 32,
    backgroundColor: '#f444',
    borderWidth: 4,
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#f44'
  },

  warningItem: {
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
  dark = dark;
  light = light

  // static setDark() {
  //   Styler.currentStyle = {...dark};
  //   console.log(Styler.currentStyle)
  // }

  // static setLight() {
  //   Styler.currentStyle = {...light};
  //   console.log(Styler.currentStyle)
  // }
}