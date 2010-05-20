// Composite Post process node.
// -------------------------------------------------------------------
// Copyright (C) 2010 OpenEngine.dk (See AUTHORS) 
// 
// This program is free software; It is covered by the GNU General 
// Public License version 2 or any later version. 
// See the GNU General Public License for more details (see LICENSE). 
//--------------------------------------------------------------------

#ifndef _COMPOSITE_POST_PROCESS_NODE_H_
#define _COMPOSITE_POST_PROCESS_NODE_H_

#include <Scene/PostProcessNode.h>
#include <list>

namespace OpenEngine {
    namespace Scene {
        
        class CompositePostProcessNode : public PostProcessNode {
        protected:
            PostProcessNode* leaf;
            std::list<PostProcessNode*> nodes;

        public:
            CompositePostProcessNode();

            CompositePostProcessNode(std::list<Resources::IShaderResourcePtr> effects, 
                                     Math::Vector<2, int> dims, 
                                     unsigned int colorBuffers = 1,
                                     bool useDepth = true);

            CompositePostProcessNode(std::list<PostProcessNode*> nodes);

            void Handle(Renderers::RenderingEventArg arg);

            /**
             * Initialize effect specific settings, such as more
             * framebuffers or other variables.
             */
            //void Initialize(Renderers::RenderingEventArg arg);

            /**
             * Handles any logic that needs to be done before the
             * effect, such as setting viewingvolume dependent
             * uniforms or updating time uniforms.
             */
            //void PreEffect(Renderers::IRenderer& renderer, Math::Matrix<4,4,float> modelview);

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
