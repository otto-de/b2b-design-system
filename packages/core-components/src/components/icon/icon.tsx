import { Build, Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { buildPath, fetchIcon, iconContent } from './request';
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

  /** The size of the icon */
  @Prop() size: '50' | '100' | '200' = '100';

  /** Will display a pointer cursor when hovering the icon */
  @Prop() clickable: boolean = false;

  @State() private pathData: string = null;

  connectedCallback() {
    this.loadIconPathData();
  }

  private isIconSupported = () => {
    return iconTypes.includes(this.icon);
  };

  render() {
    if (!this.isIconSupported()) return null;
    return (
      <Host>
        <div
          class={{
            'b2b-icon': true,
            [`b2b-icon--${this.size}`]: true,
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
