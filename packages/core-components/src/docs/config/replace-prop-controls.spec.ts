import { replacePropControls } from './replace-prop-controls';

describe('Get Args for Storybook', () => {
  const mockComponentDocs = {
    someProp: {
      options: ['option1', 'option2'],
      control: { type: 'radio' },
    },
  };

  it('should override controls for props defined in controls param', () => {
    const overrideControls = { someProp: 'select' };
    const docs = replacePropControls(mockComponentDocs, overrideControls);
    expect(docs['someProp'].control.type).toEqual('select');
  });

  it('should return undefined if component docs is undefined', () => {
    const overrideControls = { someProp: 'select' };
    const docs = replacePropControls(undefined, overrideControls);
    expect(docs).toEqual(undefined);
  });

  it('should handle missing props', () => {
    const overrideControls = { otherProp: 'select' };
    const docs = replacePropControls(mockComponentDocs, overrideControls);
    expect(docs).toEqual(mockComponentDocs);
  });

  it('should return default docs if controls is empty', () => {
    const docs = replacePropControls(mockComponentDocs, {});
    expect(docs).toEqual(mockComponentDocs);
  });

  it('should return default docs if controls is undefined', () => {
    const docs = replacePropControls(mockComponentDocs);
    expect(docs).toEqual(mockComponentDocs);
  });
});
