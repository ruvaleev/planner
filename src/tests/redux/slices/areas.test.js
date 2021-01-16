import mocks from 'mocks';

import * as areasSliceActions from 'redux/slices/areas';
import createStore from 'redux/store';

mocks();

describe('areasReducer', () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('fetchAreas', () => {
    it('fetches areas from backend', async () => {
      expect(store.getState().areasReducer.areas.length).toEqual(0);
      await store.dispatch(areasSliceActions.fetchAreas());
      expect(store.getState().areasReducer.areas.length).toEqual(2);
    });
  });

  describe('createArea', () => {
    const areaTitle = 'New Area Title';
    const validAreaData = { title: areaTitle };

    it('creates new area and appends in to store', async () => {
      expect(store.getState().areasReducer.areas.length).toEqual(0);
      await store.dispatch(areasSliceActions.createArea(validAreaData));
      expect(store.getState().areasReducer.areas.length).toEqual(1);
      expect(store.getState().areasReducer.areas[0].fields.title).toEqual(areaTitle);
      expect(store.getState().areasReducer.isError).toEqual(false);
      expect(store.getState().areasReducer.error).toEqual(null);
    });
  });

  describe('removeArea', () => {
    it('removes area out of store', async () => {
      await store.dispatch(areasSliceActions.fetchAreas());
      const area = store.getState().areasReducer.areas[0];
      expect(store.getState().areasReducer.areas.length).toEqual(2);

      await store.dispatch(areasSliceActions.removeArea(area.id));

      expect(store.getState().areasReducer.areas.length).toEqual(1);
      expect(store.getState().areasReducer.areas[0].id).not.toEqual(area.id);
      expect(store.getState().areasReducer.isError).toEqual(false);
      expect(store.getState().areasReducer.error).toEqual(null);
    });
  });

  describe('chooseArea', () => {
    let choosenAreas;

    it('set areas choosen and all others unchoosen', async () => {
      await store.dispatch(areasSliceActions.fetchAreas());
      const unchoosenArea = store.getState().areasReducer.areas.find((area) => !area.choosen);

      choosenAreas = store.getState().areasReducer.areas.filter((area) => area.choosen);
      expect(choosenAreas.length).toEqual(1);
      expect(choosenAreas[0].id).not.toEqual(unchoosenArea.id);

      await store.dispatch(areasSliceActions.chooseArea(unchoosenArea.id));

      choosenAreas = store.getState().areasReducer.areas.filter((area) => area.choosen);
      expect(choosenAreas.length).toEqual(1);
      expect(choosenAreas[0].id).toEqual(unchoosenArea.id);
    });
  });
});
