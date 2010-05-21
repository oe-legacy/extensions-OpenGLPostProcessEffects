// Chain Post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#ifndef _CHAIN_POST_PROCESS_NODE_H_
#define _CHAIN_POST_PROCESS_NODE_H_

#include <Scene/PostProcessNode.h>
#include <Core/IListener.h>
#include <Renderers/IRenderer.h>
#include <list>

namespace OpenEngine {
    namespace Scene {
        
        class ChainPostProcessNode : public ISceneNode,
                                     public Core::IListener<Renderers::RenderingEventArg> {
            OE_SCENE_NODE(ChainPostProcessNode, ISceneNode);
        protected:
            PostProcessNode* leaf;
            std::list<PostProcessNode*> nodes;

        public:
            ChainPostProcessNode();

            ChainPostProcessNode(std::list<Resources::IShaderResourcePtr> effects, 
                                     Math::Vector<2, int> dims, 
                                     unsigned int colorBuffers = 1,
                                     bool useDepth = true);

            //ChainPostProcessNode(std::list<PostProcessNode*> nodes);

            void Handle(Renderers::RenderingEventArg arg);

            PostProcessNode* GetPostProcessNode(unsigned int i);

            void AddNode(ISceneNode* sub);

            /**
             * Visit all sub nodes of the scene node.
             *
             * @param visitor Node visitor
             */
            void VisitSubNodes(ISceneNodeVisitor& visitor);
        };
        
    }
}

#endif
