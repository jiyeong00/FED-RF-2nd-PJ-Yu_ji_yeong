package com.example.user.capstone_user;

import android.app.Activity;
import android.content.ContentValues;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class Pw_activity extends Activity {
    Button okbtn;
    EditText ed_pwNow, ed_pwChange;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pw_activity);
        okbtn=(Button)findViewById(R.id.ok);
        ed_pwChange=(EditText)findViewById(R.id.ed_pwChange);
        ed_pwNow=(EditText)findViewById(R.id.ed_pwNow);
        NetworkUtil.setNetworkPolicy();

        okbtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
//                String url = "http://192.168.0.12/User_Pw_select.php";
                String url = "http://172.16.120.18/User_Pw_select.php";

                Pw_activity.NetworkTask networkTask = new Pw_activity.NetworkTask(url, null);
                networkTask.execute();
            }
        });


    }

    public class NetworkTask extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public NetworkTask(String url, ContentValues values) {

            this.url = url;
            this.values = values;
        }

        @Override
        protected String doInBackground(Void... params) {

            String result; // 요청 결과를 저장할 변수.
            RequestHttpURLConnection requestHttpURLConnection = new RequestHttpURLConnection();
            result = requestHttpURLConnection.request(url, values); // 해당 URL로 부터 결과물을 얻어온다.

            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try {
                String state1 = ed_pwNow.getText().toString();
                String state2= ed_pwChange.getText().toString();
                JSONObject order = new JSONObject(s);
                JSONArray index = order.getJSONArray("webnautes");
                for (int i = 0; i < index.length(); i++) {
                    JSONObject tt = index.getJSONObject(i);
                    if (tt.getString("lckPassword").equals(state1)) {
                        try {
//                            PHPRequest request = new PHPRequest("http://192.168.0.12/User_Pw_update.php");
                            PHPRequest request = new PHPRequest("http://172.16.120.18/User_Pw_update.php");
                            String result = request.PhPlckPassword(String.valueOf(state2));
                            if (result.equals("1")) {
                                Toast.makeText(Pw_activity.this, "비밀번호가 변경되었습니다.", Toast.LENGTH_SHORT).show();
                            } else {
                                Toast.makeText(getApplication(), "오류", Toast.LENGTH_SHORT).show();
                            }
                        } catch (MalformedURLException e) {
                            e.printStackTrace();
                        }
                    }else{
                        Toast.makeText(getApplicationContext(),"비밀번호가 틀렸습니다.",Toast.LENGTH_SHORT).show();
                    }
                }
            } catch (JSONException e) {
                ;
            }

        }
    }
}
