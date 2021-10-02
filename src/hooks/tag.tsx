import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { userRepository } from '../databases/repository/user.repository';
import { api } from '../services/api';
import { PaginationRequestPropsDTO } from './dtos/PaginationProps.dto';
import { LinkUserTagsPropsDTO } from './dtos/tags';
import { useError } from './error';

type Image = {
  id: string;
  link: string;
};
export type Tag = {
  id: string;
  name: string;
  image: Image;
  select?: boolean;
};

type TagContextData = {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  totalTags: number;
  getTags: (paginationProps: PaginationRequestPropsDTO) => Promise<Tag[]>;
  linkUserTags: (paginationProps: LinkUserTagsPropsDTO) => Promise<void>;
};

interface TagProviderProps {
  children: ReactNode;
}

const TagContext = createContext<TagContextData>({} as TagContextData);

function TagProvider({ children }: TagProviderProps) {
  const [tags, setTags] = useState<Tag[]>([] as Tag[]);
  const [totalTags, setTotalTags] = useState<number>(0);

  const { appErrorVerifyError } = useError();

  async function linkUserTags({ tagsParams, userId }: LinkUserTagsPropsDTO) {
    try {
      if (!userId) {
        const [user] = await userRepository.findAll();

        if (!user) {
          appErrorVerifyError({
            message: '',
            status_code: 'app',
            code: '0003',
          });
        }

        userId = user.external_id;
      }

      const tagsUsers = tagsParams
        .filter(tag => tag.select)
        .map(tag => ({
          client_id: userId,
          tag_id: tag.id,
        }));

      const tagsNotUsers = tagsParams
        .filter(tag => !tag.select)
        .map(tag => ({
          client_id: userId,
          tag_id: tag.id,
        }));

      await api.post('/v1/users/clients/tags', {
        client_tags: tagsUsers,
        client_tags_exclude: tagsNotUsers,
      });
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function getTags(paginationProps: PaginationRequestPropsDTO) {
    try {
      const queryParams = {
        params: { ...paginationProps },
      };

      const {
        data: { results, total },
      } = await api.get('/v1/tags', queryParams);

      setTags(results);
      setTotalTags(total);
      return results;
    } catch (err) {
      appErrorVerifyError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  return (
    <TagContext.Provider
      value={{ tags, setTags, totalTags, getTags, linkUserTags }}
    >
      {children}
    </TagContext.Provider>
  );
}

function useTag(): TagContextData {
  const context = useContext(TagContext);
  return context;
}

export { TagProvider, useTag };
