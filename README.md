
<a name="readmemd"></a>


# @raydeck/serverless-stage - v3.2.0

## Index

### Variables

* [_name](#let-_name)
* [_profile](#let-_profile)
* [_region](#let-_region)
* [_stage](#let-_stage)
* [args](#let-args)
* [name](#const-name)
* [nameArray](#const-namearray)
* [profile](#const-profile)
* [profileArray](#const-profilearray)
* [region](#const-region)
* [regionArray](#const-regionarray)
* [stage](#const-stage)
* [stageArray](#const-stagearray)

### Functions

* [configAWS](#configaws)
* [findName](#findname)
* [findProfile](#findprofile)
* [findRegion](#findregion)
* [findStage](#findstage)
* [getRegion](#getregion)

## Variables

### `Let` _name

• **_name**: *string* = ""

*Defined in [index.ts:31](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L31)*

___

### `Let` _profile

• **_profile**: *string* = ""

*Defined in [index.ts:47](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L47)*

___

### `Let` _region

• **_region**: *string* = ""

*Defined in [index.ts:75](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L75)*

___

### `Let` _stage

• **_stage**: *string* = ""

*Defined in [index.ts:4](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L4)*

___

### `Let` args

• **args**: *string[]* = process.argv.slice(2)

*Defined in [bin.ts:9](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L9)*

___

### `Const` name

• **name**: *undefined | string* = findName()

*Defined in [bin.ts:7](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L7)*

___

### `Const` nameArray

• **nameArray**: *string[]* = name ? ["--stack-name", name] : []

*Defined in [bin.ts:10](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L10)*

___

### `Const` profile

• **profile**: *undefined | string* = findProfile()

*Defined in [bin.ts:6](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L6)*

___

### `Const` profileArray

• **profileArray**: *string[]* = profile ? ["--aws-profile", profile] : []

*Defined in [bin.ts:12](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L12)*

___

### `Const` region

• **region**: *undefined | string* = findRegion()

*Defined in [bin.ts:8](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L8)*

___

### `Const` regionArray

• **regionArray**: *string[]* = region ? ["--region", region] : []

*Defined in [bin.ts:13](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L13)*

___

### `Const` stage

• **stage**: *undefined | string* = findStage()

*Defined in [bin.ts:5](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L5)*

___

### `Const` stageArray

• **stageArray**: *string[]* = stage ? ["--stage", stage] : []

*Defined in [bin.ts:11](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/bin.ts#L11)*

## Functions

###  configAWS

▸ **configAWS**(`AWS`: any, `profile`: string | undefined): *any*

*Defined in [index.ts:108](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L108)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`AWS` | any | - |
`profile` | string &#124; undefined | findProfile() |

**Returns:** *any*

___

###  findName

▸ **findName**(`dir`: string, `baseName`: string): *undefined | string*

*Defined in [index.ts:32](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dir` | string | process.cwd() |
`baseName` | string | "base" |

**Returns:** *undefined | string*

___

###  findProfile

▸ **findProfile**(`dir`: string): *undefined | string*

*Defined in [index.ts:48](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L48)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dir` | string | process.cwd() |

**Returns:** *undefined | string*

___

###  findRegion

▸ **findRegion**(`dir`: string): *undefined | string*

*Defined in [index.ts:76](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L76)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dir` | string | process.cwd() |

**Returns:** *undefined | string*

___

###  findStage

▸ **findStage**(`dir`: string): *undefined | string*

*Defined in [index.ts:5](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L5)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dir` | string | process.cwd() |

**Returns:** *undefined | string*

___

###  getRegion

▸ **getRegion**(`dir`: string): *string*

*Defined in [index.ts:103](https://github.com/rhdeck/serverless-stage/blob/ffea67e/src/index.ts#L103)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`dir` | string | process.cwd() |

**Returns:** *string*
