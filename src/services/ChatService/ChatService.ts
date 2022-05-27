import { supabase } from 'utils/supabase/supabaseClient';

interface Message {
  id?: number;
  created_at: Date;
  content: string;
  room: number;
  user: string;
  images?: ImageToUse[];
}

interface ImageToUse {
  id?: number;
  created_at: Date;
  message_id: number;
  message_room_id: number;
  message_user_id: string;
  url: string;
}

export class ChatService {
  async getUserRooms(userId: string) {
    const { data, error } = await supabase
      .from('userHasRoom')
      .select('*')
      .eq('user', userId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getRoom(roomId: string) {
    const { data, error } = await supabase
      .from('userHasRoom')
      .select('*, user!inner(*)')
      .eq('room', roomId);
    if (error) {
      throw error;
    }
    return data;
  }

  async getRoomMessages(roomId: string) {
    const { data, error } = await supabase
      .from('message')
      .select('*, images!left(*)')
      .eq('room', roomId)
      .order('created_at', { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  }

  async createMessage(messageData: Message): Promise<Message[]> {
    const { data, error } = await supabase.from('message').insert(messageData);
    if (error) {
      throw error;
    }
    return data;
  }

  async deleteMessage(messageId: number) {
    const { error } = await supabase
      .from('message')
      .delete()
      .match({ id: messageId });
    if (error) {
      throw error;
    }
  }

  async updateRoomMessages(messageData: Message[]): Promise<Message[]> {
    const { data, error } = await supabase.from('message').upsert(messageData);
    if (error) {
      throw error;
    }
    return data;
  }

  async createImageMessage(imageData: ImageToUse): Promise<ImageToUse[]> {
    const { data, error } = await supabase.from('images').insert(imageData);
    if (error) {
      throw error;
    }
    return data;
  }
}
