import GameSetting from './GameSetting';

export const styles = {
  fieldWrap: {
    width: `${GameSetting.column * 30 + 200}px`,
    height: `${GameSetting.row * 20 + 140}px`,
  },
  field: {
    width: `${GameSetting.column * 30 + 30}px`,
  },
};
