import { Build, Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { buildPath, fetchIcon, iconContent } from '../../utils/icon/request';
import { IconName, iconTypes } from './types';

@Component({
  assetsDirs: ['icons-100'],
  tag: 'b2b-icon-100',
  styleUrl: 'icon-100.scss',
  shadow: true,
})
export class B2bIcon {
  /** The name of the icon */
  @Prop() icon: IconName;

  /** The color of the icon */
  @Prop() color: 'primary' | 'secondary' | 'inverse' | 'inherit' = 'inherit';

  /** The size of the icon in pixel. Minimum is 24, maximum is 96px. */
  @Prop() size: number = 24;

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

  private isIconRightSize = (): boolean => {
    return this.size >= 24 && this.size <= 96;
  };

  render() {
    if (!this.isIconSupported() || !this.isIconRightSize()) return null;
    return (
      <Host>
        <div
          tabIndex={this.focusable ? 0 : null}
          style={{ ['width']: `${this.size}px`, ['height']: `${this.size}px` }}
          class={{
            'b2b-icon-100': true,
            [`b2b-icon-100--${this.color}`]: true,
            'b2b-icon-100--clickable': this.clickable,
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
    } else if (!this.isIconRightSize()) {
      console.warn(
        `the icon ${this.icon} uses an unsupported size (${this.size}px). Please use a size between 24 and 96 pixels.`,
      );
    }
    const icon = buildPath(this.icon);

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
