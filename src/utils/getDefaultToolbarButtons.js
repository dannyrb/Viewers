export default function() {
  return [
    {
      command: 'StackScroll',
      type: 'tool',
      text: 'Stack Scroll',
      icon: 'bars',
    },
    {
      command: 'Zoom',
      type: 'tool',
      text: 'Zoom',
      icon: 'search-plus',
    },
    {
      command: 'Wwwc',
      type: 'tool',
      text: 'Levels',
      icon: 'level',
      active: true,
    },
    {
      command: 'Pan',
      type: 'tool',
      text: 'Pan',
      icon: 'arrows',
    },
    {
      command: 'Length',
      type: 'tool',
      text: 'Length',
      icon: 'measure-temp',
    },
    /*{
        command: 'Annotate',
        type: 'tool',
        text: 'Annotate',
        icon: `icon-tools-measure-non-target`,
        active: false
    },*/
    {
      command: 'Angle',
      type: 'tool',
      text: 'Angle',
      icon: 'angle-left',
    },
    {
      command: 'reset',
      type: 'command',
      text: 'Reset',
      icon: 'reset',
    },
    {
      text: 'More',
      icon: 'ellipse-circle',
      buttons: [
        {
          command: 'Bidirectional',
          type: 'tool',
          text: 'Bidirectional',
          icon: 'measure-target',
        },
        {
          command: 'Brush',
          type: 'tool',
          text: 'Brush',
          icon: 'circle',
        },
        {
          command: 'FreehandMouse',
          type: 'tool',
          text: 'Freehand',
          icon: 'star',
        },
        {
          command: 'EllipticalRoi',
          type: 'tool',
          text: 'EllipticalRoi',
          icon: 'oval',
        },
        {
          command: 'CircleRoi',
          type: 'tool',
          text: 'CircleRoi',
          icon: 'dot-circle',
        },
        {
          command: 'RectangleRoi',
          type: 'tool',
          text: 'RectangleRoi',
          icon: 'square-o',
        },
      ],
    },
  ];
}
