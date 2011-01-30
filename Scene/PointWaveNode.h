// 2D wave post process effect
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#ifndef _POST_PROCESS_EFFECT_POINT_WAVE_H_
#define _POST_PROCESS_EFFECT_POINT_WAVE_H_

#include <Scene/PostProcessNode.h>
#include <Core/IListener.h>
#include <Devices/IMouse.h>
#include <Resources/OpenGLShader.h>

#include <deque>

namespace OpenEngine {
namespace Scene {

using Resources::OpenGLShader;
using std::deque;

class PointWaveNode 
        : public PostProcessNode
        , public Core::IListener<Devices::MouseMovedEventArg>
        , public Core::IListener<Devices::MouseButtonEventArg> {
private: 
    // temporary custom array shader to support binding of uniform arrays. Remove when this is implemented in OpenGLShader.
    class ArrayShader : public OpenGLShader { 
    private:
        string name;
        GLint count;
        GLfloat* data;
    public:
        ArrayShader(string name, float* data);
        virtual ~ArrayShader();
        void ApplyShader();

        void SetCount(unsigned int count);
    };
    float t;
    Vector<2,unsigned int> point;
    ArrayShader* glshad;
    unsigned int maxPoints;
    float* pointArray;
protected:
    deque<pair<float,Vector<2,float> > > points;
public:
    PointWaveNode(unsigned int width, unsigned int height, unsigned maxPoints);
    virtual ~PointWaveNode();
    void Handle(Renderers::RenderingEventArg arg);
    void Handle(Devices::MouseMovedEventArg arg);
    void Handle(Devices::MouseButtonEventArg arg);
    void PreEffect(Renderers::RenderingEventArg* arg, Math::Matrix<4,4,float>* modelview);
    void AddPoint(Vector<2,float> point);
    void AddScreenPoint(Vector<2,unsigned int> point);
};

}
}

#endif //_POST_PROCESS_EFFECT_POINT_WAVE_H_
