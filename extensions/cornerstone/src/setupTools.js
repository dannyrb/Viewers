import OHIF from '@ohif/core';
import updateTableWithNewMeasurementData from './lib/updateTableWithNewMeasurementData';

function getToolLabellingFlowCallback(store) {
  const setLabellingFlowDataAction = labellingFlowData => ({
    type: 'SET_LABELLING_FLOW_DATA',
    labellingFlowData,
  });

  const setLabellingFlowData = labellingFlowData => {
    store.dispatch(setLabellingFlowDataAction(labellingFlowData));
  };

  return function toolLabellingFlowCallback(
    measurementData,
    eventData,
    doneCallback,
    options = {}
  ) {
    const updateLabelling = ({ location, response, description }) => {
      // Update the measurement data with the labelling parameters

      if (location) {
        measurementData.location = location;
      }
      if (description) {
        measurementData.description = description;
      }
      if (response) {
        measurementData.response = response;
      }

      updateTableWithNewMeasurementData(measurementData);
    };

    const labellingDoneCallback = () => {
      setLabellingFlowData({ visible: false });
    };

    const labellingFlowData = {
      visible: true,
      eventData,
      measurementData,
      skipAddLabelButton: options.skipAddLabelButton,
      editLocation: options.editLocation,
      editDescription: options.editDescription,
      editResponse: options.editResponse,
      editDescriptionOnDialog: options.editDescriptionOnDialog,
      labellingDoneCallback,
      updateLabelling,
    };

    setLabellingFlowData(labellingFlowData);
  };
}

const resetLabellingAndContextMenuAction = state => ({
  type: 'RESET_LABELLING_AND_CONTEXT_MENU',
  state,
});

const setToolContextMenuDataAction = (viewportIndex, toolContextMenuData) => ({
  type: 'SET_TOOL_CONTEXT_MENU_DATA',
  viewportIndex,
  toolContextMenuData,
});

function getOnRightClickCallback(store) {
  const setToolContextMenuData = (viewportIndex, toolContextMenuData) => {
    store.dispatch(resetLabellingAndContextMenuAction());
    store.dispatch(
      setToolContextMenuDataAction(viewportIndex, toolContextMenuData)
    );
  };

  const getOnCloseCallback = viewportIndex => {
    return function onClose() {
      const toolContextMenuData = {
        visible: false,
      };

      store.dispatch(
        setToolContextMenuDataAction(viewportIndex, toolContextMenuData)
      );
    };
  };

  return function onRightClick(event) {
    const eventData = event.detail;
    const viewportIndex = parseInt(eventData.element.dataset.viewportIndex, 10);

    const toolContextMenuData = {
      eventData,
      isTouchEvent: false,
      onClose: getOnCloseCallback(viewportIndex),
    };

    setToolContextMenuData(viewportIndex, toolContextMenuData);
  };
}

function getOnTouchPressCallback(store) {
  const setToolContextMenuData = (viewportIndex, toolContextMenuData) => {
    store.dispatch(resetLabellingAndContextMenuAction());
    store.dispatch(
      setToolContextMenuDataAction(viewportIndex, toolContextMenuData)
    );
  };

  const getOnCloseCallback = viewportIndex => {
    return function onClose() {
      const toolContextMenuData = {
        visible: false,
      };

      store.dispatch(
        setToolContextMenuDataAction(viewportIndex, toolContextMenuData)
      );
    };
  };

  return function onTouchPress(event) {
    const eventData = event.detail;
    const viewportIndex = parseInt(eventData.element.dataset.viewportIndex, 10);

    const toolContextMenuData = {
      eventData,
      isTouchEvent: true,
      onClose: getOnCloseCallback(viewportIndex),
    };

    setToolContextMenuData(viewportIndex, toolContextMenuData);
  };
}

function getResetLabellingAndContextMenu(store) {
  return function resetLabellingAndContextMenu() {
    store.dispatch(resetLabellingAndContextMenuAction());
  };
}

export default function setupTools(store) {
  const toolLabellingFlowCallback = getToolLabellingFlowCallback(store);

  const onRightClick = getOnRightClickCallback(store);
  const onTouchPress = getOnTouchPressCallback(store);
  const onNewImage = getResetLabellingAndContextMenu(store);
  const onMouseClick = getResetLabellingAndContextMenu(store);
  const onTouchStart = getResetLabellingAndContextMenu(store);
}