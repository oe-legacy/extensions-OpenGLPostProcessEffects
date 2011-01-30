// 2D wave post process effect
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#include <Scene/PointWaveNode.h>

#include <Resources/ResourceManager.h>
#include <Resources/IShaderResource.h>

using namespace OpenEngine::Resources;

namespace OpenEngine {
namespace Scene {
 
PointWaveNode::PointWaveNode(unsigned int width, unsigned int height, unsigned int maxPoints) 
    : PostProcessNode(IShaderResourcePtr(glshad = new ArrayShader("points", pointArray = new float[maxPoints * 3])),
                      Vector<2,int>(width, height),
                      1,
                      false)
    , t(0.0)
    , maxPoints(maxPoints)
{
    //5.0,0.03,0.09
    glshad->AddVersion("120");
    glshad->AddDefine("NUM_POINTS", maxPoints);
    memset(pointArray, 0, maxPoints*3);
    glshad->SetCount(maxPoints);
}
        
PointWaveNode::~PointWaveNode() {
    delete pointArray;
}
    
void PointWaveNode::Handle(Renderers::RenderingEventArg arg){
    // bind custom shader stuff
    // IShaderResourcePtr shad = GetEffect();
    // shad->SetUniform("shockParams", Vector<3,float>(10.0, 0.8, 0.1));

    // run the post process shader
    PostProcessNode::Handle(arg);
}

void PointWaveNode::Handle(Devices::MouseMovedEventArg arg){
    // logger.info << "moved " << arg.x << ", "  << arg.y << logger.end;
    Vector<2,unsigned int> p(arg.x, arg.y);

    if ( (point-p).GetLength() > 20) {
        point = p;
        AddScreenPoint(point);
    }
}

void PointWaveNode::Handle(Devices::MouseButtonEventArg arg){
    if (arg.button & Devices::BUTTON_LEFT) {
        point = Vector<2,unsigned int>(arg.state.x, arg.state.y);
        AddScreenPoint(point);
    }
}


void PointWaveNode::PreEffect(Renderers::RenderingEventArg* arg, Math::Matrix<4,4,float>* modelview) {
    float dt = arg->approx * 1e-06;
    t += dt;

    deque<pair<float,Vector<2,float> > >::iterator itr = points.begin();    
    unsigned int i = 0;
    for (; itr != points.end(); ++itr) {
        pair<float,Vector<2,float> >& p = *itr;
        p.first += dt;
        pointArray[i*3] = p.first;
        p.second.ToArray(&pointArray[i*3 + 1]);
        ++i;
    }
 
    // itr = points.begin();    
    // for (; itr != points.end(); ++itr) {
    //     pair<float,Vector<2,float> >& p = *itr;
    //     logger.info << "time: " << p.first << " point: " << p.second << logger.end;
    // }
}

void PointWaveNode::AddPoint(Vector<2,float> point) {
    points.push_back(make_pair(0.0f, point));
    if (points.size() > maxPoints) {
        points.pop_front();
    }
}

void PointWaveNode::AddScreenPoint(Vector<2,unsigned int> point) {
    AddPoint(Vector<2,float>(float(point[0])/float(dimensions[0]), float(dimensions[1]-point[1])/float(dimensions[1])));
}

PointWaveNode::ArrayShader::ArrayShader(string name, float* data)
    : OpenGLShader("extensions/OpenGLPostProcessEffects/shaders/PointWave.glsl")
    , name(name)
    , count(0)
    , data(data) {

}

PointWaveNode::ArrayShader::~ArrayShader() {

}

void PointWaveNode::ArrayShader::ApplyShader() {
    OpenGLShader::ApplyShader();

    GLint loc = glGetUniformLocation(shaderProgram, name.c_str());

    glUniform3fv(loc, count, data);
}
    
void PointWaveNode::ArrayShader::SetCount(unsigned int count) {
    this->count = count;
}

}
}
