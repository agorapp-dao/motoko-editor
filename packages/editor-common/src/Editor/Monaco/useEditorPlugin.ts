import { courseService } from '../../services/courseService';
import { useEditorStore } from '../EditorStore';
import { useEffect, useState } from 'react';
import { IEditorPlugin } from '../../types/IEditorPlugin';
import { editorService } from '../editorService';
import { useMonaco } from './Monaco';
import { Monaco } from '@monaco-editor/loader';

let pluginInstance: Promise<IEditorPlugin>;

export function useEditorPlugin() {
  const store = useEditorStore();
  const monaco = useMonaco();
  const course = courseService.useCourse();

  const [plugin, setPlugin] = useState<IEditorPlugin | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!course.data || !monaco) {
        return;
      }

      if (!pluginInstance) {
        pluginInstance = createPlugin(course.data.plugin, monaco);
      }

      const plugin_ = await pluginInstance;
      setPlugin(plugin_);
    })();
  }, [course.data, monaco]);

  return plugin;
}

async function createPlugin(pluginName: string, monaco: Monaco) {
  const Plugin = await editorService.pluginLoader(pluginName);
  const plugin = new Plugin();
  await plugin.init(monaco);
  editorService.registerPlugin(plugin);
  return plugin;
}
