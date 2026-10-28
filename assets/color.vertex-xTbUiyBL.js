import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{a as r,c as i,d as a,f as o,i as s,l as c,m as l,n as u,o as d,p as f,r as p,s as m,t as h,u as g}from"./clipPlaneVertex-B6vjCJKp.js";import{a as _,i as v,n as y,o as b,r as x,t as S}from"./vertexColorMixing-EuTqxAUF.js";import{n as C,t as w}from"./instancesDeclaration-wb11pT22.js";var T,E,D,O;function k(){return(k=e((()=>{t(),l(),o(),g(),b(),w(),m(),d(),s(),u(),v(),S(),T=`colorVertexShader`,E=`attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#ifdef FOG
uniform mat4 view;
#endif
#include<instancesDeclaration>
uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#ifdef VERTEXCOLOR
vec4 colorUpdated=color;
#endif
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}
#else
gl_Position=viewProjection*worldPos;
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`,n.ShadersStore[T]||(n.ShadersStore[T]=E),D=[f,a,c,_,C,i,r,p,h,x,y];for(let e of D)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);O={name:T,shader:E}})))()}k();export{O as colorVertexShader};