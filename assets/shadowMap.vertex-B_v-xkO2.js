import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{St as r,xt as ee}from"./babylon-C2MG_MRF.js";import{a as te,c as ne,d as re,f as i,i as a,l as o,m as s,n as c,o as l,p as u,r as d,s as f,t as p,u as ie}from"./clipPlaneVertex-B6vjCJKp.js";import{n as ae,t as m}from"./sceneUboDeclaration-D7P0y9kI.js";import{n as oe,t as h}from"./meshUboDeclaration-Fi1yVgPJ.js";import{a as g,c as _,i as v,n as y,o as b,r as x,s as S,t as C}from"./morphTargetsVertex-D70N4oiM.js";import{n as se,t as w}from"./sceneVertexDeclaration-B2heT3bX.js";var T,E,D;function O(){return(O=e((()=>{t(),T=`meshVertexDeclaration`,E=`uniform mat4 world;uniform float visibility;
`,n.IncludesShadersStore[T]||(n.IncludesShadersStore[T]=E),D={name:T,shader:E}})))()}var k,A,j;function M(){return(M=e((()=>{t(),w(),O(),k=`shadowMapVertexDeclaration`,A=`#include<sceneVertexDeclaration>
#include<meshVertexDeclaration>
`,n.IncludesShadersStore[k]||(n.IncludesShadersStore[k]=A),j={name:k,shader:A}})))()}var N,P,F;function I(){return(I=e((()=>{t(),m(),h(),N=`shadowMapUboDeclaration`,P=`layout(std140,column_major) uniform;
#include<sceneUboDeclaration>
#include<meshUboDeclaration>
`,n.IncludesShadersStore[N]||(n.IncludesShadersStore[N]=P),F={name:N,shader:P}})))()}var L,R,z;function B(){return(B=e((()=>{t(),L=`shadowMapVertexExtraDeclaration`,R=`#if SM_NORMALBIAS==1
uniform vec3 lightDataSM;
#endif
uniform vec3 biasAndScaleSM;uniform vec2 depthValuesSM;varying float vDepthMetricSM;
#if SM_USEDISTANCE==1
varying vec3 vPositionWSM;
#endif
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
varying float zSM;
#endif
`,n.IncludesShadersStore[L]||(n.IncludesShadersStore[L]=R),z={name:L,shader:R}})))()}var V,H,U;function W(){return(W=e((()=>{t(),V=`shadowMapVertexNormalBias`,H=`#if SM_NORMALBIAS==1
#if SM_DIRECTIONINLIGHTDATA==1
vec3 worldLightDirSM=normalize(-lightDataSM.xyz);
#else
vec3 directionToLightSM=lightDataSM.xyz-worldPos.xyz;vec3 worldLightDirSM=normalize(directionToLightSM);
#endif
float ndlSM=dot(vNormalW,worldLightDirSM);float sinNLSM=sqrt(1.0-ndlSM*ndlSM);float normalBiasSM=biasAndScaleSM.y*sinNLSM;worldPos.xyz-=vNormalW*normalBiasSM;
#endif
`,n.IncludesShadersStore[V]||(n.IncludesShadersStore[V]=H),U={name:V,shader:H}})))()}var G,K,q;function J(){return(J=e((()=>{t(),G=`shadowMapVertexMetric`,K=`#if SM_USEDISTANCE==1
vPositionWSM=worldPos.xyz;
#endif
#if SM_DEPTHTEXTURE==1
#ifdef IS_NDC_HALF_ZRANGE
#define BIASFACTOR 0.5
#else
#define BIASFACTOR 1.0
#endif
#ifdef USE_REVERSE_DEPTHBUFFER
gl_Position.z-=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;
#else
gl_Position.z+=biasAndScaleSM.x*gl_Position.w*BIASFACTOR;
#endif
#endif
#if defined(SM_DEPTHCLAMP) && SM_DEPTHCLAMP==1
zSM=gl_Position.z;gl_Position.z=0.0;
#elif SM_USEDISTANCE==0
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetricSM=(-gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#else
vDepthMetricSM=(gl_Position.z+depthValuesSM.x)/depthValuesSM.y+biasAndScaleSM.x;
#endif
#endif
`,n.IncludesShadersStore[G]||(n.IncludesShadersStore[G]=K),q={name:G,shader:K}})))()}var Y,X,Z,Q;function $(){return($=e((()=>{t(),s(),i(),S(),g(),r(),w(),O(),M(),m(),h(),I(),B(),ie(),x(),C(),f(),l(),a(),W(),J(),c(),Y=`shadowMapVertexShader`,X=`attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#ifdef INSTANCES
attribute vec4 world0;attribute vec4 world1;attribute vec4 world2;attribute vec4 world3;
#endif
#include<helperFunctions>
#include<__decl__shadowMapVertex>
#ifdef ALPHATEXTURE
varying vec2 vUV;uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#include<shadowMapVertexExtraDeclaration>
#include<clipPlaneVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef UV2
vec2 uv2Updated=uv2;
#endif
#ifdef NORMAL
vec3 normalUpdated=normal;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#ifdef NORMAL
mat3 normWorldSM=mat3(finalWorld);
#if defined(INSTANCES) && defined(THIN_INSTANCES)
vec3 vNormalW=normalUpdated/vec3(dot(normWorldSM[0],normWorldSM[0]),dot(normWorldSM[1],normWorldSM[1]),dot(normWorldSM[2],normWorldSM[2]));vNormalW=normalize(normWorldSM*vNormalW);
#else
#ifdef NONUNIFORMSCALING
normWorldSM=transposeMat3(inverseMat3(normWorldSM));
#endif
vec3 vNormalW=normalize(normWorldSM*normalUpdated);
#endif
#endif
#include<shadowMapVertexNormalBias>
gl_Position=viewProjection*worldPos;
#include<shadowMapVertexMetric>
#ifdef ALPHATEXTURE
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#endif
#include<clipPlaneVertex>
}`,n.ShadersStore[Y]||(n.ShadersStore[Y]=X),Z=[u,re,_,b,ee,se,D,j,ae,oe,F,z,o,v,y,ne,te,d,U,q,p];for(let e of Z)n.IncludesShadersStore[e.name]||(n.IncludesShadersStore[e.name]=e.shader);Q={name:Y,shader:X}})))()}$();export{Q as shadowMapVertexShader};