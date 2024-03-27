import { Build, Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { buildPath, fetchIcon, iconContent } from '../../utils/icon/request';
import { IconName, iconTypes } from './types';

@Component({
  assetsDirs: ['icons', 'logos'],
  tag: 'b2b-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class B2bIcon {
  /** The name of the icon */
  @Prop() icon: IconName;

  /** The color of the icon */
  @Prop() color: 'primary' | 'secondary' | 'inverse' | 'inherit' = 'inherit';

  /** @deprecated The size of the icon. In the future, only 50 and 100 will be support through new components. */
  @Prop() size: '50' | '100' | '200' = '100';

  /** Will display a pointer cursor when hovering the icon */
  @Prop() clickable: boolean = false;

  /** Whether the icon can receive focus. Per default it is false. Use this for icon triggers like tooltip or flyout menu. */
  @Prop() focusable: boolean = false;

  @State() private pathData: string = null;

  connectedCallback() {
    this.loadIconPathData();
    this.warnDeprecate();
  }

  private isIconSupported = (): boolean => {
    return iconTypes.includes(this.icon);
  };

  private warnDeprecate = () => {
    if (!Build.isDev || !Build.isTesting) {
      console.warn(
        'B2B Icon is deprecated and will be removed on the next major release. Please use b2b-icon-100 or b2b-icon-50 instead.',
      );
    }
  };

  render() {
    if (!this.isIconSupported()) return null;
    return (
      <Host>
        <div
          tabIndex={this.focusable ? 0 : null}
          class={{
            'b2b-icon': true,
            [`b2b-icon--${this.size}`]: Boolean(this.size),
            [`b2b-icon--${this.color}`]: true,
            'b2b-icon--clickable': this.clickable,
          }}
          innerHTML={this.pathData}></div>
      </Host>
    );
  }

  @Watch('icon')
  private loadIconPathData() {
    if (!this.isIconSupported()) {
      console.warn(
        'icon name: ' + this.icon + ' is not supported or might have a typo.',
      );
      return;
    }
    const icon = buildPath(this.icon, 'icons');

    if (Build.isBrowser) {
      if (iconContent.has(icon)) {
        this.pathData = iconContent.get(icon);
      } else {
        fetchIcon(icon).then(() => (this.pathData = iconContent.get(icon)));
      }
    } else {
      return;
    }
  }
}
