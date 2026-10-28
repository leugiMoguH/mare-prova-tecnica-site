import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{_t as r,bt as i,dt as a,ft as o,vt as s,yt as c}from"./babylon-j47pSUdg.js";import{a as l,c as u,d,f,i as p,l as m,m as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S}from"./clipPlaneVertex-B6vjCJKp.js";import{a as C,i as w,n as T,o as E,r as D,t as O}from"./vertexColorMixing-EuTqxAUF.js";import{n as k,t as A}from"./instancesDeclaration-wb11pT22.js";import{n as j,t as M}from"./shadowsVertex-ChXr_sBO.js";import{n as N,t as P}from"./logDepthVertex-CComNCnJ.js";var F,I,L,R;function z(){return(z=e((()=>{t(),h(),f(),A(),S(),a(),E(),c(),r(),b(),_(),p(),g(),w(),M(),O(),P(),F=`cellVertexShader`,I=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying float vViewDepth;
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
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`,n.ShadersStore[F]||(n.ShadersStore[F]=I),L=[v,d,k,m,o,C,i,s,u,l,y,x,D,j,T,N];for(let e of L)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);R={name:F,shader:I}})))()}z();export{R as cellVertexShader};