package com.amao.wechat.model;

public class UserGroup {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_group.id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_group.owner_user_id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    private Integer ownerUserId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_group.client_user_id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    private Integer clientUserId;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_group.id
     *
     * @return the value of user_group.id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_group.id
     *
     * @param id the value for user_group.id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_group.owner_user_id
     *
     * @return the value of user_group.owner_user_id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    public Integer getOwnerUserId() {
        return ownerUserId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_group.owner_user_id
     *
     * @param ownerUserId the value for user_group.owner_user_id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    public void setOwnerUserId(Integer ownerUserId) {
        this.ownerUserId = ownerUserId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_group.client_user_id
     *
     * @return the value of user_group.client_user_id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    public Integer getClientUserId() {
        return clientUserId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_group.client_user_id
     *
     * @param clientUserId the value for user_group.client_user_id
     *
     * @mbggenerated Mon Dec 14 11:17:03 CST 2015
     */
    public void setClientUserId(Integer clientUserId) {
        this.clientUserId = clientUserId;
    }
}