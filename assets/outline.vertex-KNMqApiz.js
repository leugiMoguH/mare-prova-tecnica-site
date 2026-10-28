import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{dt as r,ft as i}from"./babylon-j47pSUdg.js";import{a,c as o,d as s,f as c,i as l,l as u,m as d,n as f,o as p,p as m,r as h,s as g,t as _,u as v}from"./clipPlaneVertex-B6vjCJKp.js";import{n as y,t as b}from"./instancesDeclaration-wb11pT22.js";import{a as x,c as S,i as C,n as w,o as T,r as E,s as D,t as O}from"./morphTargetsVertex-D70N4oiM.js";import{n as k,t as A}from"./logDepthVertex-CComNCnJ.js";var j,M,N,P;function F(){return(F=e((()=>{t(),d(),c(),D(),x(),v(),b(),r(),E(),O(),g(),p(),l(),f(),A(),j=`outlineVertexShader`,M=`attribute vec3 position;attribute vec3 normal;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<clipPlaneVertexDeclaration>
uniform float offset;
#include<instancesDeclaration>
uniform mat4 viewProjection;
#ifdef ALPHATEST
varying vec2 vUV;uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#include<logDepthDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{vec3 positionUpdated=position;vec3 normalUpdated=normal;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef UV2
vec2 uv2Updated=uv2;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
vec3 offsetPosition=positionUpdated+(normalUpdated*offset);
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(offsetPosition,1.0);gl_Position=viewProjection*worldPos;
#ifdef ALPHATEST
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
}
`,n.ShadersStore[j]||(n.ShadersStore[j]=M),N=[m,s,S,T,u,y,i,C,w,o,a,h,_,k];for(let e of N)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);P={name:j,shader:M}})))()}F();export{P as outlineVertexShader};