import{n as e}from"./rolldown-runtime-B0fFmPBj.js";import{n as t,t as n}from"./shaderStore-aBNeIjJY.js";import{a as r}from"./reflectionFunction-XWczT6dv.js";var i,a,o;function s(){return(s=e((()=>{t(),r(),i=`prePassDeclaration`,a=`#ifdef PREPASS
#ifndef PREPASS_CUSTOM_VARYINGS
#ifdef PREPASS_LOCAL_POSITION
varying vPosition : vec3f;
#endif
#ifdef PREPASS_DEPTH
varying vViewPos: vec3f;
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
varying vNormViewDepth: f32;
#endif
#if (defined(PREPASS_VELOCITY) || defined(PREPASS_VELOCITY_LINEAR)) && !defined(PREPASS_VELOCITY_ZERO)
varying vCurrentPosition: vec4f;varying vPreviousPosition: vec4f;
#endif
#endif
#ifdef PREPASS_OBJECT_ID
uniform objectId: f32;
#include<objectIdFunctions>
#endif
#ifdef PREPASS_MESH_BLEND_TAG
uniform meshBlendTag: i32;
#endif
#endif
`,n.IncludesShadersStoreWGSL[i]||(n.IncludesShadersStoreWGSL[i]=a),o={name:i,shader:a}})))()}var c,l,u;function d(){return(d=e((()=>{t(),c=`oitDeclaration`,l=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#define MAX_DEPTH 99999.0
var oitDepthSamplerSampler: sampler;var oitDepthSampler: texture_2d<f32>;var oitFrontColorSamplerSampler: sampler;var oitFrontColorSampler: texture_2d<f32>;
#endif
`,n.IncludesShadersStoreWGSL[c]||(n.IncludesShadersStoreWGSL[c]=l),u={name:c,shader:l}})))()}var f,p,m;function h(){return(h=e((()=>{t(),f=`imageProcessingDeclaration`,p=`#ifdef EXPOSURE
uniform exposureLinear: f32;
#endif
#ifdef CONTRAST
uniform contrast: f32;
#endif
#ifdef WHITEBALANCE
uniform whiteBalanceMatrix: mat3x3f;
#endif
#if defined(VIGNETTE) || defined(DITHER)
uniform vInverseScreenSize: vec2f;
#endif
#ifdef VIGNETTE
uniform vignetteSettings1: vec4f;uniform vignetteSettings2: vec4f;
#endif
#ifdef COLORCURVES
uniform vCameraColorCurveNegative: vec4f;uniform vCameraColorCurveNeutral: vec4f;uniform vCameraColorCurvePositive: vec4f;
#endif
#ifdef COLORGRADING
#ifdef COLORGRADING3D
var txColorTransformSampler: sampler;var txColorTransform: texture_3d<f32>;
#else
var txColorTransformSampler: sampler;var txColorTransform: texture_2d<f32>;
#endif
uniform colorTransformSettings: vec4f;
#endif
#ifdef DITHER
uniform ditherIntensity: f32;
#endif
`,n.IncludesShadersStoreWGSL[f]||(n.IncludesShadersStoreWGSL[f]=p),m={name:f,shader:p}})))()}var g,_,v;function y(){return(y=e((()=>{t(),g=`imageProcessingFunctions`,_=`#if TONEMAPPING==3
const PBRNeutralStartCompression: f32=0.8-0.04;const PBRNeutralDesaturation: f32=0.15;fn PBRNeutralToneMapping( color: vec3f )->vec3f {var x: f32=min(color.r,min(color.g,color.b));var offset: f32=select(0.04,x-6.25*x*x,x<0.08);var result=color;result-=offset;var peak: f32=max(result.r,max(result.g,result.b));if (peak<PBRNeutralStartCompression) {return result;}
var d: f32=1.-PBRNeutralStartCompression;var newPeak: f32=1.-d*d/(peak+d-PBRNeutralStartCompression);result*=newPeak/peak;var g: f32=1.-1./(PBRNeutralDesaturation*(peak-newPeak)+1.);return mix(result,newPeak* vec3f(1,1,1),g);}
#endif
#if TONEMAPPING==2
const ACESInputMat: mat3x3f= mat3x3f(
vec3f(0.59719,0.07600,0.02840),
vec3f(0.35458,0.90834,0.13383),
vec3f(0.04823,0.01566,0.83777)
);const ACESOutputMat: mat3x3f= mat3x3f(
vec3f( 1.60475,-0.10208,-0.00327),
vec3f(-0.53108, 1.10813,-0.07276),
vec3f(-0.07367,-0.00605, 1.07602)
);fn RRTAndODTFit(v: vec3f)->vec3f
{var a: vec3f=v*(v+0.0245786)-0.000090537;var b: vec3f=v*(0.983729*v+0.4329510)+0.238081;return a/b;}
fn ACESFitted(color: vec3f)->vec3f
{var output=ACESInputMat*color;output=RRTAndODTFit(output);output=ACESOutputMat*output;output=saturateVec3(output);return output;}
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_DEFINITIONS
fn applyImageProcessing(result: vec4f)->vec4f {
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATSTART
var rgb=result.rgb;;
#ifdef WHITEBALANCE
rgb=uniforms.whiteBalanceMatrix*rgb;rgb=max(rgb,vec3f(0.0));
#endif
#ifdef EXPOSURE
rgb*=uniforms.exposureLinear;
#endif
#ifdef VIGNETTE
var viewportXY: vec2f=fragmentInputs.position.xy*uniforms.vInverseScreenSize;viewportXY=viewportXY*2.0-1.0;var vignetteXY1: vec3f= vec3f(viewportXY*uniforms.vignetteSettings1.xy+uniforms.vignetteSettings1.zw,1.0);var vignetteTerm: f32=dot(vignetteXY1,vignetteXY1);var vignette: f32=pow(vignetteTerm,uniforms.vignetteSettings2.w);var vignetteColor: vec3f=uniforms.vignetteSettings2.rgb;
#ifdef VIGNETTEBLENDMODEMULTIPLY
var vignetteColorMultiplier: vec3f=mix(vignetteColor, vec3f(1,1,1),vignette);rgb*=vignetteColorMultiplier;
#endif
#ifdef VIGNETTEBLENDMODEOPAQUE
rgb=mix(vignetteColor,rgb,vignette);
#endif
#endif
#if TONEMAPPING==3
rgb=PBRNeutralToneMapping(rgb);
#elif TONEMAPPING==2
rgb=ACESFitted(rgb);
#elif TONEMAPPING==1
const tonemappingCalibration: f32=1.590579;rgb=1.0-exp2(-tonemappingCalibration*rgb);
#endif
rgb=toGammaSpaceVec3(rgb);rgb=saturateVec3(rgb);
#ifdef CONTRAST
var resultHighContrast: vec3f=rgb*rgb*(3.0-2.0*rgb);if (uniforms.contrast<1.0) {rgb=mix( vec3f(0.5,0.5,0.5),rgb,uniforms.contrast);} else {rgb=mix(rgb,resultHighContrast,uniforms.contrast-1.0);}
rgb=max(rgb,vec3f(0.));
#endif
#ifdef COLORGRADING
var colorTransformInput: vec3f=rgb*uniforms.colorTransformSettings.xxx+uniforms.colorTransformSettings.yyy;
#ifdef COLORGRADING3D
var colorTransformOutput: vec3f=textureSample(txColorTransform,txColorTransformSampler,colorTransformInput).rgb;
#else
var colorTransformOutput: vec3f=textureSample(txColorTransform,txColorTransformSampler,colorTransformInput,uniforms.colorTransformSettings.yz).rgb;
#endif
rgb=mix(rgb,colorTransformOutput,uniforms.colorTransformSettings.www);
#endif
#ifdef COLORCURVES
var luma: f32=getLuminance(rgb);var curveMix: vec2f=clamp( vec2f(luma*3.0-1.5,luma*-3.0+1.5), vec2f(0.0), vec2f(1.0));var colorCurve: vec4f=uniforms.vCameraColorCurveNeutral+curveMix.x*uniforms.vCameraColorCurvePositive-curveMix.y*uniforms.vCameraColorCurveNegative;rgb*=colorCurve.rgb;rgb=mix( vec3f(luma),rgb,colorCurve.a);
#endif
#ifdef DITHER
var rand: f32=getRand(fragmentInputs.position.xy*uniforms.vInverseScreenSize);var dither: f32=mix(-uniforms.ditherIntensity,uniforms.ditherIntensity,rand);rgb=saturateVec3(rgb+ vec3f(dither));
#endif
#define CUSTOM_IMAGEPROCESSINGFUNCTIONS_UPDATERESULT_ATEND
return vec4f(rgb,result.a);}`,n.IncludesShadersStoreWGSL[g]||(n.IncludesShadersStoreWGSL[g]=_),v={name:g,shader:_}})))()}var b,x,S;function C(){return(C=e((()=>{t(),b=`textureRepetitionFunctions`,x=`#if TEXTURE_REPETITION_MODE>0
fn _texRepHash4(p: vec2f)->vec4f {return fract(sin(vec4f(
1.0+dot(p,vec2f(37.0,17.0)),
2.0+dot(p,vec2f(11.0,47.0)),
3.0+dot(p,vec2f(41.0,29.0)),
4.0+dot(p,vec2f(23.0,31.0))
))*103.0);}
#endif
#if TEXTURE_REPETITION_MODE==1
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var k: f32=textureSample(tex,samp,0.005*uv).x;var index: f32=k*8.0;var f: f32=fract(index);var i: f32=floor(index+0.5);var ib: f32=floor(index);f=min(f,1.0-f)*2.0;var offa: vec2f=sin(vec2f(3.0,7.0)*i);var offb: vec2f=sin(vec2f(3.0,7.0)*ib);var dx: vec2f=dpdx(uv);var dy: vec2f=dpdy(uv);var cola: vec4f=textureSampleGrad(tex,samp,uv+0.3*offa,dx,dy);var colb: vec4f=textureSampleGrad(tex,samp,uv+0.3*offb,dx,dy);var colSum: f32=cola.x+cola.y+cola.z-colb.x-colb.y-colb.z;return mix(cola,colb,vec4f(smoothstep(0.2,0.8,f-0.1*colSum)));}
#elif TEXTURE_REPETITION_MODE==2
fn _texRepHexHash(p: vec2f)->vec2f {var r: vec2f=mat2x2f(127.1,269.5,311.7,183.3)*p;return fract(sin(r)*43758.5453);}
struct _TexRepTriGrid {w1: f32,
w2: f32,
w3: f32,
vertex1: vec2i,
vertex2: vec2i,
vertex3: vec2i,};fn _texRepTriangleGrid(st_in: vec2f)->_TexRepTriGrid {var st: vec2f=st_in*2.0*sqrt(3.0);var gridToSkewedGrid: mat2x2f=mat2x2f(1.0,0.0,-0.57735027,1.15470054);var skewedCoord: vec2f=gridToSkewedGrid*st;var baseId: vec2i=vec2i(floor(skewedCoord));var temp: vec3f=vec3f(fract(skewedCoord),0.0);temp.z=1.0-temp.x-temp.y;var s: f32=step(0.0,-temp.z);var s2: f32=2.0*s-1.0;var result: _TexRepTriGrid;result.w1=-temp.z*s2;result.w2=s-temp.y*s2;result.w3=s-temp.x*s2;result.vertex1=baseId+vec2i(i32(s),i32(s));result.vertex2=baseId+vec2i(i32(s),i32(1.0-s));result.vertex3=baseId+vec2i(i32(1.0-s),i32(s));return result;}
fn _texRepMakeCenST(Vertex: vec2i)->vec2f {var invSkewMat: mat2x2f=mat2x2f(1.0,0.0,0.5,1.0/1.15470054);return (invSkewMat*vec2f(Vertex))/(2.0*sqrt(3.0));}
fn _texRepLoadRot2x2(idx: vec2i,rotStr: f32)->mat2x2f {var angle: f32=f32(abs(idx.x*idx.y)+abs(idx.x+idx.y))+3.14159265358979;angle=angle % (2.0*3.14159265358979);if (angle<0.0) { angle+=2.0*3.14159265358979; }
if (angle>3.14159265358979) { angle-=3.14159265358979; }
angle*=rotStr;var cs: f32=cos(angle);var si: f32=sin(angle);return mat2x2f(cs,si,-si,cs);}
fn _texRepGain3(x: vec3f,r: f32)->vec3f {var k: f32=log(1.0-r)/log(0.5);var s: vec3f=2.0*step(vec3f(0.5),x);var m: vec3f=2.0*(1.0-s);var res: vec3f=0.5*s+0.25*m*pow(max(vec3f(0.0),s+x*m),vec3f(k));return res/(res.x+res.y+res.z);}
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var rotStrength: f32=uniforms.vTextureRepetitionHexTilingParams.x;var fallOffContrast: f32=uniforms.vTextureRepetitionHexTilingParams.y;var expVal: f32=uniforms.vTextureRepetitionHexTilingParams.z;var r: f32=uniforms.vTextureRepetitionHexTilingParams.w;var dSTdx: vec2f=dpdx(uv);var dSTdy: vec2f=dpdy(uv);var grid: _TexRepTriGrid=_texRepTriangleGrid(uv);var rot1: mat2x2f=_texRepLoadRot2x2(grid.vertex1,rotStrength);var rot2: mat2x2f=_texRepLoadRot2x2(grid.vertex2,rotStrength);var rot3: mat2x2f=_texRepLoadRot2x2(grid.vertex3,rotStrength);var cen1: vec2f=_texRepMakeCenST(grid.vertex1);var cen2: vec2f=_texRepMakeCenST(grid.vertex2);var cen3: vec2f=_texRepMakeCenST(grid.vertex3);var st1: vec2f=(uv-cen1)*rot1+cen1+_texRepHexHash(vec2f(grid.vertex1));var st2: vec2f=(uv-cen2)*rot2+cen2+_texRepHexHash(vec2f(grid.vertex2));var st3: vec2f=(uv-cen3)*rot3+cen3+_texRepHexHash(vec2f(grid.vertex3));var c1: vec4f=textureSampleGrad(tex,samp,st1,dSTdx*rot1,dSTdy*rot1);var c2: vec4f=textureSampleGrad(tex,samp,st2,dSTdx*rot2,dSTdy*rot2);var c3: vec4f=textureSampleGrad(tex,samp,st3,dSTdx*rot3,dSTdy*rot3);var Lw: vec3f=vec3f(0.299,0.587,0.114);var Dw: vec3f=vec3f(dot(c1.rgb,Lw),dot(c2.rgb,Lw),dot(c3.rgb,Lw));Dw=mix(vec3f(1.0),Dw,fallOffContrast);var W: vec3f=Dw*pow(vec3f(grid.w1,grid.w2,grid.w3),vec3f(expVal));W=W/(W.x+W.y+W.z);if (r != 0.5) {W=_texRepGain3(W,r);}
return W.x*c1+W.y*c2+W.z*c3;}
#elif TEXTURE_REPETITION_MODE==3
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var iuv: vec2f=floor(uv);var fuv: vec2f=fract(uv);var ofa: vec4f=_texRepHash4(iuv+vec2f(0.0,0.0));var ofb: vec4f=_texRepHash4(iuv+vec2f(1.0,0.0));var ofc: vec4f=_texRepHash4(iuv+vec2f(0.0,1.0));var ofd: vec4f=_texRepHash4(iuv+vec2f(1.0,1.0));var dx: vec2f=dpdx(uv);var dy: vec2f=dpdy(uv);ofa=vec4f(ofa.xy,sign(ofa.zw-0.5));ofb=vec4f(ofb.xy,sign(ofb.zw-0.5));ofc=vec4f(ofc.xy,sign(ofc.zw-0.5));ofd=vec4f(ofd.xy,sign(ofd.zw-0.5));var uva: vec2f=uv*ofa.zw+ofa.xy; var ddxa: vec2f=dx*ofa.zw; var ddya: vec2f=dy*ofa.zw;var uvb: vec2f=uv*ofb.zw+ofb.xy; var ddxb: vec2f=dx*ofb.zw; var ddyb: vec2f=dy*ofb.zw;var uvc: vec2f=uv*ofc.zw+ofc.xy; var ddxc: vec2f=dx*ofc.zw; var ddyc: vec2f=dy*ofc.zw;var uvd: vec2f=uv*ofd.zw+ofd.xy; var ddxd: vec2f=dx*ofd.zw; var ddyd: vec2f=dy*ofd.zw;var b: vec2f=smoothstep(vec2f(0.25),vec2f(0.75),fuv);return mix(
mix(textureSampleGrad(tex,samp,uva,ddxa,ddya),textureSampleGrad(tex,samp,uvb,ddxb,ddyb),b.x),
mix(textureSampleGrad(tex,samp,uvc,ddxc,ddyc),textureSampleGrad(tex,samp,uvd,ddxd,ddyd),b.x),
b.y
);}
#elif TEXTURE_REPETITION_MODE==4
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var p: vec2f=floor(uv);var f: vec2f=fract(uv);var dx: vec2f=dpdx(uv);var dy: vec2f=dpdy(uv);var va: vec4f=vec4f(0.0);var wt: f32=0.0;var w2: f32=0.0;for (var j: i32=-1; j<=1; j++) {for (var i: i32=-1; i<=1; i++) {var g: vec2f=vec2f(f32(i),f32(j));var o: vec4f=_texRepHash4(p+g);var r: vec2f=g-f+o.xy;var d: f32=dot(r,r);var w: f32=exp(-5.0*d);var c: vec4f=textureSampleGrad(tex,samp,uv+o.zw,dx,dy);va+=w*c;wt+=w;w2+=w*w;}}
var mean: f32=0.3;var res: vec4f=mean+(va-wt*mean)/sqrt(w2);return mix(va/wt,res,0.4);}
#endif
#if TEXTURE_REPETITION_MODE>0
fn TEXRD(t: texture_2d<f32>,ts: sampler,uv: vec2f)->vec4f {return _texRepSample(t,ts,uv);}
#else
fn TEXRD(t: texture_2d<f32>,ts: sampler,uv: vec2f)->vec4f {return textureSample(t,ts,uv);}
#endif
#define TEXRD_DEFINED
`,n.IncludesShadersStoreWGSL[b]||(n.IncludesShadersStoreWGSL[b]=x),S={name:b,shader:x}})))()}var w,T,E;function D(){return(D=e((()=>{t(),w=`meshBlendTagFragmentOutput`,T=`#if SCENE_MRT_COUNT>{X}
#if defined(PREPASS_MESH_BLEND_TAG) && PREPASS_MESH_BLEND_TAG_INDEX=={X}
fragmentOutputs.fragData{X}=meshBlendTagOutput;
#else
fragmentOutputs.fragData{X}=fragData[{X}];
#endif
#endif
`,n.IncludesShadersStoreWGSL[w]||(n.IncludesShadersStoreWGSL[w]=T),E={name:w,shader:T}})))()}var O,k,A;function j(){return(j=e((()=>{t(),O=`oitFragment`,k=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
var fragDepth: f32=fragmentInputs.position.z; 
#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS
var halfFloat: u32=pack2x16float( vec2f(fragDepth));var full: vec2f=unpack2x16float(halfFloat);fragDepth=full.x;
#endif
var fragCoord: vec2i=vec2i(fragmentInputs.position.xy);var lastDepth: vec2f=textureLoad(oitDepthSampler,fragCoord,0).rg;var lastFrontColor: vec4f=textureLoad(oitFrontColorSampler,fragCoord,0);fragmentOutputs.depth=vec2f(-MAX_DEPTH);fragmentOutputs.frontColor=lastFrontColor;fragmentOutputs.backColor= vec4f(0.0);
#ifdef USE_REVERSE_DEPTHBUFFER
var furthestDepth: f32=-lastDepth.x;var nearestDepth: f32=lastDepth.y;
#else
var nearestDepth: f32=-lastDepth.x;var furthestDepth: f32=lastDepth.y;
#endif
var alphaMultiplier: f32=1.0-lastFrontColor.a;
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth>nearestDepth || fragDepth<furthestDepth) {
#else
if (fragDepth<nearestDepth || fragDepth>furthestDepth) {
#endif
return fragmentOutputs;}
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth<nearestDepth && fragDepth>furthestDepth) {
#else
if (fragDepth>nearestDepth && fragDepth<furthestDepth) {
#endif
fragmentOutputs.depth=vec2f(-fragDepth,fragDepth);return fragmentOutputs;}
#endif
`,n.IncludesShadersStoreWGSL[O]||(n.IncludesShadersStoreWGSL[O]=k),A={name:O,shader:k}})))()}export{C as a,y as c,d,u as f,E as i,m as l,o as m,A as n,S as o,s as p,D as r,v as s,j as t,h as u};