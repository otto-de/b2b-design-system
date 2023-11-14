# 007. Table component

Last update: 19.09.2022

## Background

The table component is one of the most complex we want to integrate into B2bDS and is important to document what has 
being explored so far.

### Status

accepted

### Options

#### 1. Encapsulate table and pass an object with column and cell data.

Advantages
- We have more control over the internal behaviour of the table
- Teams don't have to worry about structuring the table, but how to structure the data object
- Allow us to use html table tags that otherwise can't be used in option 2 (`<table><tbody><tr>`)

Challenges
- We were not able to find a reliable way to pass child components or render other jsx on our table eg. passing a 
React button component in the data object. 

    The only way found was to use a [templating mechanism](https://github.com/otto-ec/b2b-design-system/commit/27ae4c6df34a1362a9c753c3574e6d5e77c935b2) that will require 
teams to slightly depend on Stencil and we would like to keep that dependency encapsulated only to the internals of 
the component library. 


#### 2. Creating components that resemble the current html table structure 

Advantages
- We provide a more familiar way of using tables
- Passing other components as children is straight forward using slots

Challenges
- We cannot make use of native table features such as col- or rowspans
- We could not use html semantic table elements as the host web component breaks the 
  semantic structure:

```shell
<b2b-table>
  <table>
    <b2b-header>
      <header>
      ...
```
#### 3. Using components that semantically resemble the html table structure but use flexbox

Advantages
- Most table features to date can be displayed using flexbox
- Gives the freedom to add colspans for headers and cells

Challenges
- Having a table that expands columns to fit the largest content of all cells in that column is not possible
- Only fixed width or equal width can be achieved
- Text truncation and overflow are harder to handle

### Decision

We decided for option two as the ability to pass children components is a must-have. Hopefully if that can be solved 
in the future we may be able to have a table-data component that encapsulates better the table.

### Note
We implemented the table using shadow dom for consistency and to support slots, but most of the classes are 
declared in the host elements meaning they live still in the light-dom and can be overwritten.

This was necessary because of how the elements are structured, where all children are passed in slots but are still 
part of the light-dom. For any `display` styles to work it needs to be declared in the light-dom as well.

### Links
Examples of table-data implementations (option1)
[revolist](https://revolist.github.io/revogrid/demo/)
[telekom data grid](https://telekom.github.io/scale/?path=/docs/components-data-grid--standard&globals=locale:en;colorMode:light)

Spike commits:
[templating](https://github.com/otto-ec/b2b-design-system/commit/27ae4c6df34a1362a9c753c3574e6d5e77c935b2)
[vue solution](https://github.com/otto-ec/b2b-design-system/commit/97081b1bc44542a71a9f98bcc01e8207c3941bdf)

