package com.example.user.capstone_user;

import android.app.Activity;
import android.content.ContentValues;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Connection;

public class Open_activity extends Activity {
    TextView Txt_Us_Open;
    EditText Edt_Us_Write;
    Button Btn_Us_Check;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.open_activity);

        Txt_Us_Open = (TextView) findViewById(R.id.Txt_Us_Open);
        Edt_Us_Write = (EditText) findViewById(R.id.Edt_Us_Write);
        Btn_Us_Check = (Button) findViewById(R.id.Btn_Us_Check);

        Btn_Us_Check.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

//                String url = "http://192.168.0.12/User_Open_select.php";
                String url = "http://172.16.120.18/User_Open_select.php";

                Open_activity.NetworkTask networkTask = new Open_activity.NetworkTask(url, null);
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
                String result = "";
                String state1 = Edt_Us_Write.getText().toString();
                JSONObject order = new JSONObject(s);
                JSONArray index = order.getJSONArray("webnautes");
                for (int i = 0; i < index.length(); i++) {
                    JSONObject tt = index.getJSONObject(i);
                    if (tt.getString("lckPassword").equals(state1)) {
//                        String url = "http://192.168.0.12/User_Open.php";
                        String url = "http://172.16.120.18/User_Open.php";

                        Open_activity.NetworkTask2 networkTask = new Open_activity.NetworkTask2(url, null);
                        networkTask.execute();
                    }else {
                        Toast.makeText(Open_activity.this, "비밀번호가 틀렸습니다.", Toast.LENGTH_SHORT).show();
                    }
                }
            } catch (JSONException e) {
                ;
            }

        }
    }

    public class NetworkTask2 extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public NetworkTask2(String url, ContentValues values) {

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
            Toast.makeText(Open_activity.this, "사물함이 OPEN 되었습니다.", Toast.LENGTH_SHORT).show();


        }
    }
}
