import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{a as r,c as i,d as a,f as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g}from"./clipPlaneVertex-C26LcOi4.js";import{a as _,i as v,n as y,o as b,r as x,t as S}from"./vertexColorMixing-BofwnIN-.js";import{n as C,t as w}from"./instancesDeclaration-Ch5J9ALt.js";var T,E,D,O;function k(){return(k=e((()=>{t(),l(),o(),g(),b(),w(),m(),d(),s(),u(),v(),S(),T=`colorVertexShader`,E=`attribute position: vec3f;
#ifdef VERTEXCOLOR
attribute color: vec4f;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#ifdef FOG
uniform view: mat4x4f;
#endif
#include<instancesDeclaration>
uniform viewProjection: mat4x4f;
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vColor: vec4f;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
#ifdef VERTEXCOLOR
var colorUpdated: vec4f=vertexInputs.color;
#endif
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
var worldPos: vec4f=finalWorld* vec4f(vertexInputs.position,1.0);vertexOutputs.position=uniforms.viewProjection*worldPos;
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`,n.ShadersStoreWGSL[T]||(n.ShadersStoreWGSL[T]=E),D=[f,a,c,_,C,i,r,p,h,x,y];for(let e of D)n.IncludesShadersStoreWGSL[e.name]||(n.IncludesShadersStoreWGSL[e.name]=e.shader);O={name:T,shader:E}})))()}k();export{O as colorVertexShaderWGSL};