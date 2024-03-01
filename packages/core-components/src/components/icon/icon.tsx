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

  /** @deprecated The size of the icon. Use the newer variant property instead. */
  @Prop() size: '50' | '100' | '200' = '100';

  /** Icon variant. Icon 50 is only available for select icons. Icon 100 is 24x24px and can be scaled up. */
  @Prop() variant: '50' | '100';

  /** Will display a pointer cursor when hovering the icon */
  @Prop() clickable: boolean = false;

  @State() private pathData: string = null;

  connectedCallback() {
    this.loadIconPathData();
  }

  private isIconSupported = (): boolean => {
    return iconTypes.includes(this.icon);
  };

  private isIconCorrectSize = (): boolean => {
    if (Boolean(this.variant)) {
      const isSmall = this.icon.includes('50') && this.variant != '50';
      const isBig = !this.icon.includes('50') && this.variant === '50';
      return !(isSmall || isBig);
    } else {
      return true;
    }
  };

  render() {
    if (!this.isIconSupported() || !this.isIconCorrectSize()) return null;
    return (
      <Host>
        <div
          class={{
            'b2b-icon': true,
            [`b2b-icon--${this.size}`]:
              Boolean(this.size) && !Boolean(this.variant),
            [`b2b-icon--variant-${this.variant}`]: Boolean(this.variant),
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
    } else if (!this.isIconCorrectSize()) {
      console.warn(
        'you are trying to use ' +
          this.icon +
          ' as a size 50 icon but have specified an incorrect variant property. Please make sure that all icons with the suffix -50 are of variant 50.',
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
