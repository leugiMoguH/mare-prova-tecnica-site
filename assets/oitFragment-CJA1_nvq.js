import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{a as r}from"./reflectionFunction-CygR95sW.js";var i,a,o;function s(){return(s=e((()=>{t(),i=`decalFragmentDeclaration`,a=`#ifdef DECAL
uniform vec4 vDecalInfos;
#endif
`,n.IncludesShadersStore[i]||(n.IncludesShadersStore[i]=a),o={name:i,shader:a}})))()}var c,l,u;function d(){return(d=e((()=>{t(),r(),c=`prePassDeclaration`,l=`#ifdef PREPASS
#extension GL_EXT_draw_buffers : require
#ifdef PREPASS_MESH_BLEND_TAG
#if {X}>0
#if PREPASS_MESH_BLEND_TAG_INDEX==0
layout(location=0) out highp uvec4 meshBlendTagOutput;
#else
layout(location=0) out highp vec4 glFragData0;
#endif
#endif
#if {X}>1
#if PREPASS_MESH_BLEND_TAG_INDEX==1
layout(location=1) out highp uvec4 meshBlendTagOutput;
#else
layout(location=1) out highp vec4 glFragData1;
#endif
#endif
#if {X}>2
#if PREPASS_MESH_BLEND_TAG_INDEX==2
layout(location=2) out highp uvec4 meshBlendTagOutput;
#else
layout(location=2) out highp vec4 glFragData2;
#endif
#endif
#if {X}>3
#if PREPASS_MESH_BLEND_TAG_INDEX==3
layout(location=3) out highp uvec4 meshBlendTagOutput;
#else
layout(location=3) out highp vec4 glFragData3;
#endif
#endif
#if {X}>4
#if PREPASS_MESH_BLEND_TAG_INDEX==4
layout(location=4) out highp uvec4 meshBlendTagOutput;
#else
layout(location=4) out highp vec4 glFragData4;
#endif
#endif
#if {X}>5
#if PREPASS_MESH_BLEND_TAG_INDEX==5
layout(location=5) out highp uvec4 meshBlendTagOutput;
#else
layout(location=5) out highp vec4 glFragData5;
#endif
#endif
#if {X}>6
#if PREPASS_MESH_BLEND_TAG_INDEX==6
layout(location=6) out highp uvec4 meshBlendTagOutput;
#else
layout(location=6) out highp vec4 glFragData6;
#endif
#endif
#if {X}>7
#if PREPASS_MESH_BLEND_TAG_INDEX==7
layout(location=7) out highp uvec4 meshBlendTagOutput;
#else
layout(location=7) out highp vec4 glFragData7;
#endif
#endif
void writeGeometryFragmentOutput(highp int index,highp vec4 value) {
#if {X}>0 && PREPASS_MESH_BLEND_TAG_INDEX != 0
if (index==0) { glFragData0=value; }
#endif
#if {X}>1 && PREPASS_MESH_BLEND_TAG_INDEX != 1
if (index==1) { glFragData1=value; }
#endif
#if {X}>2 && PREPASS_MESH_BLEND_TAG_INDEX != 2
if (index==2) { glFragData2=value; }
#endif
#if {X}>3 && PREPASS_MESH_BLEND_TAG_INDEX != 3
if (index==3) { glFragData3=value; }
#endif
#if {X}>4 && PREPASS_MESH_BLEND_TAG_INDEX != 4
if (index==4) { glFragData4=value; }
#endif
#if {X}>5 && PREPASS_MESH_BLEND_TAG_INDEX != 5
if (index==5) { glFragData5=value; }
#endif
#if {X}>6 && PREPASS_MESH_BLEND_TAG_INDEX != 6
if (index==6) { glFragData6=value; }
#endif
#if {X}>7 && PREPASS_MESH_BLEND_TAG_INDEX != 7
if (index==7) { glFragData7=value; }
#endif
}
#define WRITE_GEOMETRY_FRAGMENT_OUTPUT(INDEX,VALUE) writeGeometryFragmentOutput(INDEX,VALUE)
#else
layout(location=0) out highp vec4 glFragData[{X}];
#define WRITE_GEOMETRY_FRAGMENT_OUTPUT(INDEX,VALUE) gl_FragData[INDEX]=VALUE
#endif
highp vec4 gl_FragColor;
#ifndef PREPASS_CUSTOM_VARYINGS
#ifdef PREPASS_LOCAL_POSITION
varying highp vec3 vPosition;
#endif
#ifdef PREPASS_DEPTH
varying highp vec3 vViewPos;
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
varying highp float vNormViewDepth;
#endif
#if (defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)) && !defined(PREPASS_VELOCITY_ZERO)
varying highp vec4 vCurrentPosition;varying highp vec4 vPreviousPosition;
#endif
#endif
#ifdef PREPASS_OBJECT_ID
uniform highp float objectId;
#include<objectIdFunctions>
#endif
#ifdef PREPASS_MESH_BLEND_TAG
uniform highp int meshBlendTag;
#endif
#endif
`,n.IncludesShadersStore[c]||(n.IncludesShadersStore[c]=l),u={name:c,shader:l}})))()}var f,p,m;function h(){return(h=e((()=>{t(),f=`oitDeclaration`,p=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#extension GL_EXT_draw_buffers : require
layout(location=0) out vec2 depth; 
layout(location=1) out vec4 frontColor;layout(location=2) out vec4 backColor;
#define MAX_DEPTH 99999.0
highp vec4 gl_FragColor;uniform highp sampler2D oitDepthSampler;uniform sampler2D oitFrontColorSampler;
#endif
`,n.IncludesShadersStore[f]||(n.IncludesShadersStore[f]=p),m={name:f,shader:p}})))()}var g,_,v;function y(){return(y=e((()=>{t(),g=`imageProcessingDeclaration`,_=`#ifdef EXPOSURE
uniform float exposureLinear;
#endif
#ifdef CONTRAST
uniform float contrast;
#endif
#ifdef WHITEBALANCE
uniform mat3 whiteBalanceMatrix;
#endif
#if defined(VIGNETTE) || defined(DITHER)
uniform vec2 vInverseScreenSize;
#endif
#ifdef VIGNETTE
uniform vec4 vignetteSettings1;uniform vec4 vignetteSettings2;
#endif
#ifdef COLORCURVES
uniform vec4 vCameraColorCurveNegative;uniform vec4 vCameraColorCurveNeutral;uniform vec4 vCameraColorCurvePositive;
#endif
#ifdef COLORGRADING
#ifdef COLORGRADING3D
uniform highp sampler3D txColorTransform;
#else
uniform sampler2D txColorTransform;
#endif
uniform vec4 colorTransformSettings;
#endif
#ifdef DITHER
uniform float ditherIntensity;
#endif
`,n.IncludesShadersStore[g]||(n.IncludesShadersStore[g]=_),v={name:g,shader:_}})))()}var b,x,S;function C(){return(C=e((()=>{t(),b=`imageProcessingFunctions`,x=`#if defined(COLORGRADING) && !defined(COLORGRADING3D)
/** 
* Polyfill for SAMPLE_TEXTURE_3D,which is unsupported in WebGL.
* sampler3dSetting.x=textureOffset (0.5/textureSize).
* sampler3dSetting.y=textureSize.
*/
#define inline
vec3 sampleTexture3D(sampler2D colorTransform,vec3 color,vec2 sampler3dSetting)
{float sliceSize=2.0*sampler3dSetting.x; 
#ifdef SAMPLER3DGREENDEPTH
float sliceContinuous=(color.g-sampler3dSetting.x)*sampler3dSetting.y;
#else
float sliceContinuous=(color.b-sampler3dSetting.x)*sampler3dSetting.y;
#endif
float sliceInteger=floor(sliceContinuous);float sliceFraction=sliceContinuous-sliceInteger;
#ifdef SAMPLER3DGREENDEPTH
vec2 sliceUV=color.rb;
#else
vec2 sliceUV=color.rg;
#endif
sliceUV.x*=sliceSize;sliceUV.x+=sliceInteger*sliceSize;sliceUV=saturate(sliceUV);vec4 slice0Color=texture2D(colorTransform,sliceUV);sliceUV.x+=sliceSize;sliceUV=saturate(sliceUV);vec4 slice1Color=texture2D(colorTransform,sliceUV);vec3 result=mix(slice0Color.rgb,slice1Color.rgb,sliceFraction);
#ifdef SAMPLER3DBGRMAP
color.rgb=result.rgb;
#else
color.rgb=result.bgr;
#endif
return color;}
#endif
#if TONEMAPPING==3
const float PBRNeutralStartCompression=0.8-0.04;const float PBRNeutralDesaturation=0.15;vec3 PBRNeutralToneMapping( vec3 color ) {float x=min(color.r,min(color.g,color.b));float offset=x<0.08 ? x-6.25*x*x : 0.04;color-=offset;float peak=max(color.r,max(color.g,color.b));if (peak<PBRNeutralStartCompression) return color;float d=1.-PBRNeutralStartCompression;float newPeak=1.-d*d/(peak+d-PBRNeutralStartCompression);color*=newPeak/peak;float g=1.-1./(PBRNeutralDesaturation*(peak-newPeak)+1.);return mix(color,newPeak*vec3(1,1,1),g);}
#endif
#if TONEMAPPING==2
const mat3 ACESInputMat=mat3(
vec3(0.59719,0.07600,0.02840),
vec3(0.35458,0.90834,0.13383),
vec3(0.04823,0.01566,0.83777)
);const mat3 ACESOutputMat=mat3(
vec3( 1.60475,-0.10208,-0.00327),
vec3(-0.53108, 1.10813,-0.07276),
vec3(-0.07367,-0.00605, 1.07602)
);vec3 RRTAndODTFit(vec3 v)
{vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}
vec3 ACESFitted(vec3 color)
{color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;color=saturate(color);return color;}
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_DEFINITIONS
vec4 applyImageProcessing(vec4 result) {
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATSTART
#ifdef WHITEBALANCE
result.rgb=whiteBalanceMatrix*result.rgb;result.rgb=max(result.rgb,0.0);
#endif
#ifdef EXPOSURE
result.rgb*=exposureLinear;
#endif
#ifdef VIGNETTE
vec2 viewportXY=gl_FragCoord.xy*vInverseScreenSize;viewportXY=viewportXY*2.0-1.0;vec3 vignetteXY1=vec3(viewportXY*vignetteSettings1.xy+vignetteSettings1.zw,1.0);float vignetteTerm=dot(vignetteXY1,vignetteXY1);float vignette=pow(vignetteTerm,vignetteSettings2.w);vec3 vignetteColor=vignetteSettings2.rgb;
#ifdef VIGNETTEBLENDMODEMULTIPLY
vec3 vignetteColorMultiplier=mix(vignetteColor,vec3(1,1,1),vignette);result.rgb*=vignetteColorMultiplier;
#endif
#ifdef VIGNETTEBLENDMODEOPAQUE
result.rgb=mix(vignetteColor,result.rgb,vignette);
#endif
#endif
#if TONEMAPPING==3
result.rgb=PBRNeutralToneMapping(result.rgb);
#elif TONEMAPPING==2
result.rgb=ACESFitted(result.rgb);
#elif TONEMAPPING==1
const float tonemappingCalibration=1.590579;result.rgb=1.0-exp2(-tonemappingCalibration*result.rgb);
#endif
result.rgb=toGammaSpace(result.rgb);result.rgb=saturate(result.rgb);
#ifdef CONTRAST
vec3 resultHighContrast=result.rgb*result.rgb*(3.0-2.0*result.rgb);if (contrast<1.0) {result.rgb=mix(vec3(0.5,0.5,0.5),result.rgb,contrast);} else {result.rgb=mix(result.rgb,resultHighContrast,contrast-1.0);}
result.rgb=max(result.rgb,0.);
#endif
#ifdef COLORGRADING
vec3 colorTransformInput=result.rgb*colorTransformSettings.xxx+colorTransformSettings.yyy;
#ifdef COLORGRADING3D
vec3 colorTransformOutput=texture(txColorTransform,colorTransformInput).rgb;
#else
vec3 colorTransformOutput=sampleTexture3D(txColorTransform,colorTransformInput,colorTransformSettings.yz).rgb;
#endif
result.rgb=mix(result.rgb,colorTransformOutput,colorTransformSettings.www);
#endif
#ifdef COLORCURVES
float luma=getLuminance(result.rgb);vec2 curveMix=clamp(vec2(luma*3.0-1.5,luma*-3.0+1.5),vec2(0.0),vec2(1.0));vec4 colorCurve=vCameraColorCurveNeutral+curveMix.x*vCameraColorCurvePositive-curveMix.y*vCameraColorCurveNegative;result.rgb*=colorCurve.rgb;result.rgb=mix(vec3(luma),result.rgb,colorCurve.a);
#endif
#ifdef DITHER
float rand=getRand(gl_FragCoord.xy*vInverseScreenSize);float dither=mix(-ditherIntensity,ditherIntensity,rand);result.rgb=saturate(result.rgb+vec3(dither));
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATEND
return result;}`,n.IncludesShadersStore[b]||(n.IncludesShadersStore[b]=x),S={name:b,shader:x}})))()}var w,T,E;function D(){return(D=e((()=>{t(),w=`textureRepetitionFunctions`,T=`#if TEXTURE_REPETITION_MODE>0
vec4 _texRepHash4(vec2 p) {return fract(sin(vec4(
1.0+dot(p,vec2(37.0,17.0)),
2.0+dot(p,vec2(11.0,47.0)),
3.0+dot(p,vec2(41.0,29.0)),
4.0+dot(p,vec2(23.0,31.0))
))*103.0);}
#endif
#if TEXTURE_REPETITION_MODE==1
vec4 _texRepSample(sampler2D samp,vec2 uv) {float k=texture2D(samp,0.005*uv).x;float index=k*8.0;float f=fract(index);float i=floor(index+0.5);float ib=floor(index);f=min(f,1.0-f)*2.0;vec2 offa=sin(vec2(3.0,7.0)*i);vec2 offb=sin(vec2(3.0,7.0)*ib);vec2 dx=dFdx(uv);vec2 dy=dFdy(uv);vec4 cola=textureGrad(samp,uv+0.3*offa,dx,dy);vec4 colb=textureGrad(samp,uv+0.3*offb,dx,dy);float colSum=cola.x+cola.y+cola.z-colb.x-colb.y-colb.z;return mix(cola,colb,smoothstep(0.2,0.8,f-0.1*colSum));}
#elif TEXTURE_REPETITION_MODE==2
#ifndef TEXTURE_REPETITION_M_PI
#define TEXTURE_REPETITION_M_PI 3.14159265358979
#endif
vec2 _texRepHexHash(vec2 p) {vec2 r=mat2(127.1,269.5,311.7,183.3)*p;return fract(sin(r)*43758.5453);}
void _texRepTriangleGrid(
out float w1,out float w2,out float w3,
out ivec2 vertex1,out ivec2 vertex2,out ivec2 vertex3,
vec2 st
) {st*=2.0*sqrt(3.0);mat2 gridToSkewedGrid=mat2(1.0,0.0,-0.57735027,1.15470054);vec2 skewedCoord=gridToSkewedGrid*st;ivec2 baseId=ivec2(floor(skewedCoord));vec3 temp=vec3(fract(skewedCoord),0.0);temp.z=1.0-temp.x-temp.y;float s=step(0.0,-temp.z);float s2=2.0*s-1.0;w1=-temp.z*s2;w2=s-temp.y*s2;w3=s-temp.x*s2;vertex1=baseId+ivec2(int(s),int(s));vertex2=baseId+ivec2(int(s),int(1.0-s));vertex3=baseId+ivec2(int(1.0-s),int(s));}
vec2 _texRepMakeCenST(ivec2 Vertex) {mat2 invSkewMat=mat2(1.0,0.0,0.5,1.0/1.15470054);return (invSkewMat*vec2(Vertex))/(2.0*sqrt(3.0));}
mat2 _texRepLoadRot2x2(ivec2 idx,float rotStr) {float angle=float(abs(idx.x*idx.y)+abs(idx.x+idx.y))+TEXTURE_REPETITION_M_PI;angle=mod(angle,2.0*TEXTURE_REPETITION_M_PI);if (angle<0.0) angle+=2.0*TEXTURE_REPETITION_M_PI;if (angle>TEXTURE_REPETITION_M_PI) angle-=TEXTURE_REPETITION_M_PI;angle*=rotStr;float cs=cos(angle);float si=sin(angle);return mat2(cs,si,-si,cs);}
vec3 _texRepGain3(vec3 x,float r) {float k=log(1.0-r)/log(0.5);vec3 s=2.0*step(0.5,x);vec3 m=2.0*(1.0-s);vec3 res=0.5*s+0.25*m*pow(max(vec3(0.0),s+x*m),vec3(k));return res/(res.x+res.y+res.z);}
vec4 _texRepSample(sampler2D samp,vec2 uv) {float rotStrength=vTextureRepetitionHexTilingParams.x;float fallOffContrast=vTextureRepetitionHexTilingParams.y;float expVal=vTextureRepetitionHexTilingParams.z;float r=vTextureRepetitionHexTilingParams.w;vec2 dSTdx=dFdx(uv);vec2 dSTdy=dFdy(uv);float w1,w2,w3;ivec2 vertex1,vertex2,vertex3;_texRepTriangleGrid(w1,w2,w3,vertex1,vertex2,vertex3,uv);mat2 rot1=_texRepLoadRot2x2(vertex1,rotStrength);mat2 rot2=_texRepLoadRot2x2(vertex2,rotStrength);mat2 rot3=_texRepLoadRot2x2(vertex3,rotStrength);vec2 cen1=_texRepMakeCenST(vertex1);vec2 cen2=_texRepMakeCenST(vertex2);vec2 cen3=_texRepMakeCenST(vertex3);vec2 st1=(uv-cen1)*rot1+cen1+_texRepHexHash(vec2(vertex1));vec2 st2=(uv-cen2)*rot2+cen2+_texRepHexHash(vec2(vertex2));vec2 st3=(uv-cen3)*rot3+cen3+_texRepHexHash(vec2(vertex3));vec4 c1=textureGrad(samp,st1,dSTdx*rot1,dSTdy*rot1);vec4 c2=textureGrad(samp,st2,dSTdx*rot2,dSTdy*rot2);vec4 c3=textureGrad(samp,st3,dSTdx*rot3,dSTdy*rot3);vec3 Lw=vec3(0.299,0.587,0.114);vec3 Dw=vec3(dot(c1.rgb,Lw),dot(c2.rgb,Lw),dot(c3.rgb,Lw));Dw=mix(vec3(1.0),Dw,fallOffContrast);vec3 W=Dw*pow(vec3(w1,w2,w3),vec3(expVal));W/=(W.x+W.y+W.z);if (r != 0.5) {W=_texRepGain3(W,r);}
return W.x*c1+W.y*c2+W.z*c3;}
#elif TEXTURE_REPETITION_MODE==3
vec4 _texRepSample(sampler2D samp,vec2 uv) {vec2 iuv=floor(uv);vec2 fuv=fract(uv);vec4 ofa=_texRepHash4(iuv+vec2(0.0,0.0));vec4 ofb=_texRepHash4(iuv+vec2(1.0,0.0));vec4 ofc=_texRepHash4(iuv+vec2(0.0,1.0));vec4 ofd=_texRepHash4(iuv+vec2(1.0,1.0));vec2 dx=dFdx(uv);vec2 dy=dFdy(uv);ofa.zw=sign(ofa.zw-0.5);ofb.zw=sign(ofb.zw-0.5);ofc.zw=sign(ofc.zw-0.5);ofd.zw=sign(ofd.zw-0.5);vec2 uva=uv*ofa.zw+ofa.xy; vec2 ddxa=dx*ofa.zw; vec2 ddya=dy*ofa.zw;vec2 uvb=uv*ofb.zw+ofb.xy; vec2 ddxb=dx*ofb.zw; vec2 ddyb=dy*ofb.zw;vec2 uvc=uv*ofc.zw+ofc.xy; vec2 ddxc=dx*ofc.zw; vec2 ddyc=dy*ofc.zw;vec2 uvd=uv*ofd.zw+ofd.xy; vec2 ddxd=dx*ofd.zw; vec2 ddyd=dy*ofd.zw;vec2 b=smoothstep(0.25,0.75,fuv);return mix(
mix(textureGrad(samp,uva,ddxa,ddya),textureGrad(samp,uvb,ddxb,ddyb),b.x),
mix(textureGrad(samp,uvc,ddxc,ddyc),textureGrad(samp,uvd,ddxd,ddyd),b.x),
b.y
);}
#elif TEXTURE_REPETITION_MODE==4
vec4 _texRepSample(sampler2D samp,vec2 uv) {vec2 p=floor(uv);vec2 f=fract(uv);vec2 dx=dFdx(uv);vec2 dy=dFdy(uv);vec4 va=vec4(0.0);float wt=0.0;float w2=0.0;for (int j=-1; j<=1; j++) {for (int i=-1; i<=1; i++) {vec2 g=vec2(float(i),float(j));vec4 o=_texRepHash4(p+g);vec2 r=g-f+o.xy;float d=dot(r,r);float w=exp(-5.0*d);vec4 c=textureGrad(samp,uv+o.zw,dx,dy);va+=w*c;wt+=w;w2+=w*w;}}
float mean=0.3;vec4 res=mean+(va-wt*mean)/sqrt(w2);return mix(va/wt,res,0.4);}
#endif
#if TEXTURE_REPETITION_MODE>0
#define TEXRD(s,uv) _texRepSample(s,uv)
#else
#define TEXRD(s,uv) texture2D(s,uv)
#endif
#define TEXRD_DEFINED
`,n.IncludesShadersStore[w]||(n.IncludesShadersStore[w]=T),E={name:w,shader:T}})))()}var O,k,A;function j(){return(j=e((()=>{t(),O=`oitFragment`,k=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
float fragDepth=gl_FragCoord.z; 
#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS
uint halfFloat=packHalf2x16(vec2(fragDepth));vec2 full=unpackHalf2x16(halfFloat);fragDepth=full.x;
#endif
ivec2 fragCoord=ivec2(gl_FragCoord.xy);vec2 lastDepth=texelFetch(oitDepthSampler,fragCoord,0).rg;vec4 lastFrontColor=texelFetch(oitFrontColorSampler,fragCoord,0);depth.rg=vec2(-MAX_DEPTH);frontColor=lastFrontColor;backColor=vec4(0.0);
#ifdef USE_REVERSE_DEPTHBUFFER
float furthestDepth=-lastDepth.x;float nearestDepth=lastDepth.y;
#else
float nearestDepth=-lastDepth.x;float furthestDepth=lastDepth.y;
#endif
float alphaMultiplier=1.0-lastFrontColor.a;
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth>nearestDepth || fragDepth<furthestDepth) {
#else
if (fragDepth<nearestDepth || fragDepth>furthestDepth) {
#endif
return;}
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth<nearestDepth && fragDepth>furthestDepth) {
#else
if (fragDepth>nearestDepth && fragDepth<furthestDepth) {
#endif
depth.rg=vec2(-fragDepth,fragDepth);return;}
#endif
`,n.IncludesShadersStore[O]||(n.IncludesShadersStore[O]=k),A={name:O,shader:k}})))()}export{S as a,y as c,d,u as f,E as i,h as l,s as m,A as n,C as o,o as p,D as r,v as s,j as t,m as u};