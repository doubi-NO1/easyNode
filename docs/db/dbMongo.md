## Constants

<dl>
<dt><a href="#MongoClient">MongoClient</a></dt>
<dd><p>mongodb封装</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Mongo">Mongo(config)</a> ⇒</dt>
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

## Mongo(config) ⇒
Mongo实例构造器

**Kind**: global function  
**Returns**: object  

| Param | Type |
| --- | --- |
| config | <code>Object</code> | 


* [Mongo(config)](#Mongo) ⇒
    * [.find(options, isOne)](#Mongo+find) ⇒
    * [.findOne(options)](#Mongo+findOne) ⇒
    * [.insert(options)](#Mongo+insert) ⇒
    * [.update(options)](#Mongo+update) ⇒
    * [.remove(options)](#Mongo+remove) ⇒

<a name="Mongo+find"></a>

### mongo.find(options, isOne) ⇒
查找

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| isOne | <code>Boolean</code> | 

<a name="Mongo+findOne"></a>

### mongo.findOne(options) ⇒
查询一条数据

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Mongo+insert"></a>

### mongo.insert(options) ⇒
新增

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Mongo+update"></a>

### mongo.update(options) ⇒
更新

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Mongo+remove"></a>

### mongo.remove(options) ⇒
删除

**Kind**: instance method of [<code>Mongo</code>](#Mongo)  
**Returns**: promise  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

