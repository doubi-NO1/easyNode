## Constants

<dl>
<dt><a href="#MongoClient">MongoClient</a></dt>
<dd><p>mongodb封装</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Mongo">Mongo(配置项)</a> ⇒</dt>
<dd><p>Mongo实例构造器</p>
</dd>
</dl>

<a name="MongoClient"></a>

## MongoClient
mongodb封装

**Kind**: global constant  
**Author**: 巴神
2017/9/10  
<a name="Mongo"></a>

## Mongo(配置项) ⇒
Mongo实例构造器

**Kind**: global function  
**Returns**: object  

| Param | Type |
| --- | --- |
| 配置项 | <code>Object</code> | 


* [Mongo(配置项)](#Mongo) ⇒
    * [.find(配置项, 是否多条)](#Mongo+find) ⇒
    * [.findOne(选项)](#Mongo+findOne) ⇒
    * [.insert(配置项)](#Mongo+insert) ⇒
    * [.update(options)](#Mongo+update) ⇒
    * [.remove(options)](#Mongo+remove) ⇒

<a name="Mongo+find"></a>

### mongo.find(配置项, 是否多条) ⇒
查找

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise对象  

| Param | Type |
| --- | --- |
| 配置项 | <code>Object</code> | 
| 是否多条 | <code>Boolean</code> | 

<a name="Mongo+findOne"></a>

### mongo.findOne(选项) ⇒
查询一条数据

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise对象  

| Param | Type |
| --- | --- |
| 选项 | <code>Object</code> | 

<a name="Mongo+insert"></a>

### mongo.insert(配置项) ⇒
新增

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise对象  

| Param | Type |
| --- | --- |
| 配置项 | <code>Object</code> | 

<a name="Mongo+update"></a>

### mongo.update(options) ⇒
更新

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise对象  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Mongo+remove"></a>

### mongo.remove(options) ⇒
删除

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise对象  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

