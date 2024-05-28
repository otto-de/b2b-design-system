import { Build, Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { buildPath, fetchIcon, iconContent } from '../../utils/icon/request';
import { IconName, iconTypes } from './types';

@Component({
  assetsDirs: ['icons-50'],
  tag: 'b2b-icon-50',
  styleUrl: 'icon-50.scss',
  shadow: true,
})
export class B2bIcon {
  /** The name of the icon */
  @Prop() icon: IconName;

  /** The color of the icon */
  @Prop() color: 'primary' | 'secondary' | 'inverse' | 'inherit' = 'inherit';

  /** Will display a pointer cursor when hovering the icon */
  @Prop() clickable: boolean = false;

  /** Whether the icon can receive focus. Per default it is false. Use this for icon triggers like tooltip or flyout menu. */
  @Prop() focusable: boolean = false;

  @State() private pathData: string = null;

  connectedCallback() {
    this.loadIconPathData();
  }

  private isIconSupported = (): boolean => {
    return iconTypes.includes(this.icon);
  };

  render() {
    if (!this.isIconSupported()) return null;
    return (
      <Host>
        <div
          tabIndex={this.focusable ? 0 : null}
          class={{
            'b2b-icon-50': true,
            [`b2b-icon-50--${this.color}`]: true,
            'b2b-icon-50--clickable': this.clickable,
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
    const icon = buildPath(this.icon, 'icons-50');

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
