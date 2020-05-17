import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";

import agent from "../api/agent";
import { IProfile, IPhoto, IUserActivity } from "../models/Profile";
import { toast } from "react-toastify";
import { IUserBio } from "../models/user";

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loadingPhoto = false;
  @observable loadingBio = false;
  @observable loading = false;
  @observable followings: IProfile[] = [];
  @observable activeTab: number = 0;
  @observable userActivities: IUserActivity[] = [];
  @observable loadingActivities = false;

  @action setActiveTab = (activeIndex: number) => {
    this.activeTab = activeIndex;
  };

  @computed get isCurrentUser() {
    if (this.rootStore.userStore && this.profile) {
      return this.rootStore.userStore.user?.username === this.profile.username;
    } else {
      return false;
    }
  }

  @action loadUserActivities = async (username: string, predicate?: string) => {
    this.loadingActivities = true;
    try {
      const activities = await agent.Profiles.listActivities(
        username,
        predicate!
      );
      runInAction(() => {
        this.userActivities = activities;
        this.loadingActivities = false;
      });
    } catch (error) {
      toast.error("Problem loading activities ");
      runInAction(() => {
        this.loadingActivities = false;
      });
    }
  };

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log("error at loading from api");
      console.log(error);
    }
  };
  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          // trivial if so typescript wont cry
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
          this.uploadingPhoto = false;
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Problem uploading photo");
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loadingPhoto = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.photos.find((a) => a.isMain)!.isMain = false;
        this.profile!.photos.find((a) => a.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
        this.loadingPhoto = false;
      });
    } catch (error) {
      toast.error("Problem setting photo as main");
    }
    runInAction(() => {
      this.loadingPhoto = false;
    });
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.loadingPhoto = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter(
          (a) => a.id !== photo.id
        );
        this.loadingPhoto = false;
      });
    } catch (error) {
      toast.error("problem deleting the photo");
      runInAction(() => {
        this.loadingPhoto = false;
      });
    }
  };

  @action updateBio = async (about: IUserBio) => {
    this.loadingBio = true;
    try {
      await agent.Profiles.updateBio(about);
      runInAction(() => {
        this.profile!.bio = about.bio;
        this.profile!.displayName = about.displayName;
        this.loadingBio = false;
      });
    } catch (error) {
      toast.error("Problem updating the bio");
      runInAction(() => {
        this.loadingBio = false;
      });
    }
  };

  @action follow = async (username: string) => {
    this.loading = true;
    try {
      await agent.Profiles.follow(username);
      runInAction(() => {
        this.profile!.following = true;
        this.profile!.followersCount++;
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem following user");
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action unfollow = async (username: string) => {
    this.loading = true;
    try {
      await agent.Profiles.unfollow(username);
      runInAction(() => {
        this.profile!.following = false;
        this.profile!.followersCount--;
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem to unfollow user");
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action loadFollowings = async (predicate: string) => {
    this.loading = true;
    try {
      const profiles = await agent.Profiles.listFollowings(
        this.profile!.username,
        predicate
      );
      runInAction(() => {
        this.followings = profiles;
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem loading followings");
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
