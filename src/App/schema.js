import {
  MdAddCircle,
  MdRemoveCircleOutline,
  MdExposureZero,
  MdLens,
  MdPlayCircleOutline,
} from 'react-icons/md'

const Int = 'Int'
const Any = 'Any'
const Void = 'Void'
const types = [Int]

/**
 * Commands in schema have keys to know what type of command is being dragged.Ensure that these keys
 * are unique for each command.TODO: why do ports have key?
 */
export const schema = {
  types,
  commands: [
    {
      name: 'Inkrement',
      key: 'inc',
      desc: 'Zvysi hodnotu, a tuto hodnotu vrati na vstupe',
      inPorts: [{ key: 'in', name: 'Hodnota', type: Int }],
      outPorts: [{ key: 'out', name: 'Zvysena hodnota', type: Int }],
      color: 'rgb(0,100,255)',
      Icon: MdAddCircle,
    },
    {
      name: 'Dekrement',
      key: 'dec',
      desc: 'Znizi hodnotu, a tuto hodnotu vrati na vstupe',
      inPorts: [{ key: 'in', name: 'Hodnota', type: Int }],
      outPorts: [{ key: 'out', name: 'Znizena hodnota', type: Int }],
      color: 'rgb(110,50,180)',
      Icon: MdRemoveCircleOutline,
    },
    {
      name: 'Je nula',
      key: 'is_zero',
      desc: 'Skontroluje ci je hodnota rovna 0',
      inPorts: [{ key: 'in', name: 'Hodnota', type: Int }],
      outPorts: [
        { key: 'zero', name: 'Ano', type: Void },
        { key: 'nonzero', name: 'Nie', type: Void },
      ],
      color: 'rgb(192,255,0)',
      Icon: MdExposureZero,
    },
    {
      name: 'Zaciatok',
      key: 'begin',
      desc: 'Zaciatok vasho programu',
      inPorts: [],
      outPorts: [{ key: 'out', name: 'Zaciatok', type: Int }],
      color: 'rgb(100,20,0)',
      Icon: MdPlayCircleOutline,
    },
    {
      name: 'Koniec',
      key: 'end',
      desc: 'Koniec vasho programu',
      inPorts: [{ key: 'in', name: 'Koniec', type: Any }],
      outPorts: [],
      color: 'rgb(200,150,150)',
      Icon: MdLens,
    },
  ],
  maxSteps: 10000,
}
